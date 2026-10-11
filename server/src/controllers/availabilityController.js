import Developer from "../models/Developer.js";
import Allocation from "../models/Allocation.js";

const ONE_DAY = 24 * 60 * 60 * 1000;

// GET /api/developers/available?from=2026-11-01&to=2027-04-30&skill=react native
// Answers: who is free in these dates, and if not free, from which date?
export async function getAvailableDevelopers(req, res) {
  const { from, to, skill } = req.query;

  const fromDate = new Date(from);
  const toDate = new Date(to);
  if (!from || !to || isNaN(fromDate) || isNaN(toDate)) {
    return res.status(400).json({ message: "from and to are required, for example from=2026-11-01&to=2027-04-30" });
  }
  if (toDate < fromDate) {
    return res.status(400).json({ message: "to must be on or after from" });
  }

  // 1. Get the developers (only the ones with the skill, if a skill is given)
  const filter = { isActive: true };
  if (skill) filter["skills.name"] = skill.toLowerCase().trim();
  const developers = await Developer.find(filter).sort({ name: 1 });

  // 2. Get every allocation of these developers that overlaps the date range
  const allocations = await Allocation.find({
    developer: { $in: developers.map((dev) => dev._id) },
    startDate: { $lte: toDate },
    endDate: { $gte: fromDate },
  });

  // 3. For each developer, add up the percent and work out when they are free
  const result = developers.map((dev) => {
    const mine = allocations.filter((item) => item.developer.equals(dev._id));

    const allocatedPercent = Math.min(100, mine.reduce((total, item) => total + item.percent, 0));
    const freePercent = 100 - allocatedPercent;
    const isAvailable = freePercent > 0;

    // The last day this developer is busy inside the range (null if not busy at all)
    const busyUntil = mine.length ? new Date(Math.max(...mine.map((item) => item.endDate))) : null;

    // Free now: the start of the range. Not free: the day after the last allocation ends.
    const availableFrom = isAvailable ? fromDate : new Date(busyUntil.getTime() + ONE_DAY);

    return {
      _id: dev._id,
      name: dev.name,
      title: dev.title,
      seniority: dev.seniority,
      skills: dev.skills,
      hourlyRate: dev.hourlyRate,
      allocatedPercent,
      freePercent,
      isAvailable,
      busyUntil,
      availableFrom,
    };
  });

  // Most free developers first
  result.sort((a, b) => b.freePercent - a.freePercent);

  res.json(result);
}
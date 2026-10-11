import Allocation from "../models/Allocation.js";
import Developer from "../models/Developer.js";

// GET /api/allocations?developer=<id>
export async function getAllocations(req, res) {
  const filter = {};
  if (req.query.developer) filter.developer = req.query.developer;

  const allocations = await Allocation.find(filter)
    .populate("developer", "name title")
    .populate("project", "name clientName")
    .sort({ startDate: -1 });

  res.json(allocations);
}

// POST /api/allocations
export async function createAllocation(req, res) {
  const { developer, project, request, startDate, endDate, status } = req.body || {};
  const percent = Number(req.body?.percent ?? 100);

  if (!developer || !startDate || !endDate) {
    return res.status(400).json({ message: "developer, startDate and endDate are required" });
  }

  const developerExists = await Developer.exists({ _id: developer });
  if (!developerExists) {
    return res.status(404).json({ message: "Developer not found" });
  }

  // Find this developer's allocations that overlap the new dates.
  // Two date ranges overlap when each one starts before the other one ends.
  const overlapping = await Allocation.find({
    developer,
    startDate: { $lte: new Date(endDate) },
    endDate: { $gte: new Date(startDate) },
  });

  const alreadyAllocated = overlapping.reduce((total, item) => total + item.percent, 0);
  if (alreadyAllocated + percent > 100) {
    return res.status(400).json({
      message: `Developer is already allocated ${alreadyAllocated}% in these dates, so ${percent}% more is not possible`,
    });
  }

  const allocation = await Allocation.create({
    developer, project, request, startDate, endDate, percent, status,
  });
  res.status(201).json(allocation);
}
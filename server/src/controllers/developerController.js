import Developer from "../models/Developer.js";

// GET /api/developers?skill=react native&seniority=senior&department=Mobile
export async function getDevelopers(req, res) {
  const { skill, seniority, department } = req.query;

  const filter = { isActive: true };
  if (skill) filter["skills.name"] = skill.toLowerCase().trim();
  if (seniority) filter.seniority = seniority;
  if (department) filter.department = department;

  const developers = await Developer.find(filter).sort({ name: 1 });
  res.json(developers);
}

// GET /api/developers/:id
export async function getDeveloper(req, res) {
  const developer = await Developer.findById(req.params.id);
  if (!developer) {
    return res.status(404).json({ message: "Developer not found" });
  }
  res.json(developer);
}

// POST /api/developers
export async function createDeveloper(req, res) {
  const developer = await Developer.create(req.body || {});
  res.status(201).json(developer);
}

// PUT /api/developers/:id
export async function updateDeveloper(req, res) {
  const developer = await Developer.findByIdAndUpdate(req.params.id, req.body || {}, {
    returnDocument: "after", // send back the updated developer, not the old one
    runValidators: true, // check the model rules on update too
  });
  if (!developer) {
    return res.status(404).json({ message: "Developer not found" });
  }
  res.json(developer);
}
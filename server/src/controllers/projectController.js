import Project from "../models/Project.js";

// GET /api/projects
export async function getProjects(req, res) {
  const projects = await Project.find().sort({ startDate: -1 });
  res.json(projects);
}

// POST /api/projects
export async function createProject(req, res) {
  const project = await Project.create(req.body || {});
  res.status(201).json(project);
}
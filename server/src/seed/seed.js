import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Developer from "../models/Developer.js";
import Project from "../models/Project.js";
import Allocation from "../models/Allocation.js";
import ClientRequest from "../models/ClientRequest.js";
import TeamProposal from "../models/TeamProposal.js";
import AgentRun from "../models/AgentRun.js";
import { users, developers, projects, allocations } from "./data.js";

async function seed() {
  await connectDB();

  // 1. Start clean: remove old data from every collection
  const models = [User, Developer, Project, Allocation, ClientRequest, TeamProposal, AgentRun];
  for (const model of models) {
    await model.deleteMany({});
  }

  // 2. Users: hash the password before saving
  const userDocs = [];
  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    userDocs.push({ name: user.name, email: user.email, role: user.role, passwordHash });
  }
  await User.insertMany(userDocs);

  // 3. Developers and projects
  const savedDevelopers = await Developer.insertMany(developers);
  const savedProjects = await Project.insertMany(projects);

  // 4. Allocations use names in data.js, so we swap each name for its database _id
  const developerByName = new Map(savedDevelopers.map((dev) => [dev.name, dev]));
  const projectByName = new Map(savedProjects.map((project) => [project.name, project]));

  const allocationDocs = allocations.map(([devName, projectName, percent, start, end]) => {
    const developer = developerByName.get(devName);
    const project = projectByName.get(projectName);
    if (!developer) throw new Error(`Developer not found: ${devName}`);
    if (!project) throw new Error(`Project not found: ${projectName}`);

    return {
      developer: developer._id,
      project: project._id,
      percent,
      startDate: start || project.startDate,
      endDate: end || project.endDate,
      status: "confirmed",
    };
  });
  await Allocation.insertMany(allocationDocs);

  console.log("Seed complete:");
  console.log(`  Users:       ${userDocs.length}`);
  console.log(`  Developers:  ${savedDevelopers.length}`);
  console.log(`  Projects:    ${savedProjects.length}`);
  console.log(`  Allocations: ${allocationDocs.length}`);
  console.log("Login: sales@teammatch.dev / Sales123");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
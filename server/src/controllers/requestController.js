import ClientRequest from "../models/ClientRequest.js";
import AgentRun from "../models/AgentRun.js";
import TeamProposal from "../models/TeamProposal.js";
import { runTeamMatch } from "../services/teamMatch.js";

// POST /api/requests
// Saves the client's message, then starts the AI agents in the background.
export async function createRequest(req, res) {
  const { rawText, source } = req.body || {};

  if (!rawText || rawText.trim().length < 10) {
    return res.status(400).json({ message: "Please write the client's request (at least 10 characters)" });
  }

  const request = await ClientRequest.create({
    rawText,
    source,
    status: "processing",
    createdBy: req.user.id, // comes from the token, set by the protect middleware
  });

  // Start the AI agents in the background. We do not wait for them,
  // so the user gets an answer straight away and the screen shows "Agents working".
  runTeamMatch(request);

  res.status(201).json(request);
}

// GET /api/requests?status=processing
export async function getRequests(req, res) {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const requests = await ClientRequest.find(filter)
    .populate("createdBy", "name")
    .sort({ createdAt: -1 });

  res.json(requests);
}

// GET /api/requests/:id
// One request with everything the detail screen needs:
// the request itself, each agent's progress, and the team options.
export async function getRequest(req, res) {
  const request = await ClientRequest.findById(req.params.id).populate("createdBy", "name");
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  const agentRuns = await AgentRun.find({ request: request._id }).sort({ startedAt: 1 });

  const proposal = await TeamProposal.findOne({ request: request._id }).populate(
    "options.members.developer",
    "name title seniority hourlyRate"
  );

  res.json({ request, agentRuns, proposal });
}
import TeamProposal from "../models/TeamProposal.js";

// Sends a saved request to the n8n workflow, waits for the team options and saves them.
// It runs in the background, so the sales person does not have to wait for the AI.
export async function runTeamMatch(request) {
  try {
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: request._id.toString(), rawText: request.rawText }),
      signal: AbortSignal.timeout(120000), // give up after 2 minutes
    });

    if (!response.ok) {
      throw new Error(`n8n answered with status ${response.status}`);
    }

    const result = await response.json();
    if (!result.options?.length) {
      throw new Error("The agents did not return any team options");
    }

    // Save the team options
    await TeamProposal.create({
      request: request._id,
      options: result.options.map((option) => ({
        label: option.label,
        summary: option.summary,
        estimatedCost: option.estimatedCost,
        gaps: option.gaps,
        members: option.members.map((member) => ({
          developer: member.developer,
          role: member.role,
          matchScore: member.matchScore,
          reason: member.reason,
          availableFrom: member.availableFrom,
        })),
      })),
    });

    // Save what the Requirement agent understood, and mark the request as done
    request.parsed = result.parsed;
    request.status = "proposed";
    await request.save();
  } catch (err) {
    console.error("Team match failed:", err.message);
    request.status = "failed";
    request.errorMessage = err.message;
    await request.save();
  }
}
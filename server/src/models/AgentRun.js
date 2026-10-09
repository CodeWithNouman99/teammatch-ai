import mongoose from "mongoose";

const agentRunSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Schema.Types.ObjectId, ref: "ClientRequest", required: true },
    agentName: {
      type: String,
      enum: ["requirement", "matcher", "availability", "teamLead", "profile"],
      required: true,
    },
    status: { type: String, enum: ["running", "done", "failed"], default: "running" },
    summary: { type: String, default: "" },
    startedAt: { type: Date, default: Date.now },
    finishedAt: Date,
  },
  { timestamps: true }
);

agentRunSchema.index({ request: 1, agentName: 1 }, { unique: true });

export default mongoose.model("AgentRun", agentRunSchema);
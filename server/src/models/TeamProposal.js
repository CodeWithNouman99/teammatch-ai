import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    developer: { type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: true },
    role: { type: String, required: true },
    matchScore: { type: Number, min: 0, max: 100, required: true },
    reason: { type: String, default: "" },
    availableFrom: Date,
    clientProfile: { type: String, default: "" },
  },
  { _id: false }
);

const optionSchema = new mongoose.Schema({
  label: { type: String, required: true },
    summary: { type: String, default: "" },
  members: [memberSchema],
  gaps: [String],
  estimatedCost: { type: Number, min: 0 },
});

const teamProposalSchema = new mongoose.Schema(
  {
    request: { type: mongoose.Schema.Types.ObjectId, ref: "ClientRequest", required: true, unique: true },
    options: [optionSchema],
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
    approvedOption: mongoose.Schema.Types.ObjectId,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("TeamProposal", teamProposalSchema);
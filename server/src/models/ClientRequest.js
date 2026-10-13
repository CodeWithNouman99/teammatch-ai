import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    skills: [{ type: String, lowercase: true, trim: true }],
    seniority: { type: String, enum: ["junior", "mid", "senior", "lead", "any"], default: "any" },
    count: { type: Number, min: 1, default: 1 },
  },
  { _id: false }
);

const clientRequestSchema = new mongoose.Schema(
  {
    rawText: { type: String, required: true, trim: true },
    source: { type: String, enum: ["email", "whatsapp", "call", "website", "other"], default: "other" },
    parsed: {
      roles: [roleSchema],
      durationMonths: Number,
      startDate: Date,
      budget: Number,
      industry: String,
            notes: String,
    },
    status: {
      type: String,
      enum: ["processing", "proposed", "approved", "failed"],
      default: "processing",
    },
    errorMessage: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("ClientRequest", clientRequestSchema);
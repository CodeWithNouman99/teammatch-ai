import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    level: { type: String, enum: ["beginner", "intermediate", "expert"], required: true },
    years: { type: Number, min: 0, default: 0 },
  },
  { _id: false }
);

const developerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    seniority: { type: String, enum: ["junior", "mid", "senior", "lead"], required: true },
    skills: [skillSchema],
    bio: { type: String, default: "" },
    hourlyRate: { type: Number, min: 0, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

developerSchema.index({ "skills.name": 1 });

export default mongoose.model("Developer", developerSchema);
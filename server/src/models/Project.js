import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    clientName: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    techStack: [{ type: String, lowercase: true, trim: true }],
    description: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
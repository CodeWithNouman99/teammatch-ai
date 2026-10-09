import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
  {
    developer: { type: mongoose.Schema.Types.ObjectId, ref: "Developer", required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    request: { type: mongoose.Schema.Types.ObjectId, ref: "ClientRequest" },
    startDate: { type: Date, required: true },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          return value >= this.startDate;
        },
        message: "endDate must be on or after startDate",
      },
    },
    percent: { type: Number, min: 1, max: 100, default: 100 },
    status: { type: String, enum: ["confirmed", "tentative"], default: "confirmed" },
  },
  { timestamps: true }
);

allocationSchema.index({ developer: 1, startDate: 1, endDate: 1 });

export default mongoose.model("Allocation", allocationSchema);
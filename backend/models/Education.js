import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  description: { type: String },
  period: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date }
}, { timestamps: true });

export default mongoose.model("Education", educationSchema);
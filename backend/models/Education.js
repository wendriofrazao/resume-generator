import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  degree: { type: String },
  institution: { type: String },
  description: { type: String },
  period: { type: String },
  startDate: { type: Date },
  endDate: { type: Date }
}, { timestamps: true });

export default mongoose.model("Education", educationSchema);
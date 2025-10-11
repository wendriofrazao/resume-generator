import mongoose from 'mongoose'

const workExperienceSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  jobDegree: {type: String},
  company: {type: String},
  description: {type: String },
  period: {type: String},
  startDate: {type: Date},
  endDate: {type: Date },
}, { timestamps: true });

export default mongoose.model("WorkExperience", workExperienceSchema);
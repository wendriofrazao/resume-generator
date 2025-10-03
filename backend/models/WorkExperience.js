import mongoose from 'mongoose'

const workExperienceSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  jobTitle: {type: String},
  company: {type: String},
  startDate: {type: Date},
  endDate: {type: Date },
  description: {type: String }
}, { timestamps: true });

module.exports = mongoose.model("WorkExperience", workExperienceSchema);
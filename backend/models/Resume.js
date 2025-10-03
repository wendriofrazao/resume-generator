import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);

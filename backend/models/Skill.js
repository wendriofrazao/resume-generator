import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  skillName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);
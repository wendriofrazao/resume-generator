import mongoose from 'mongoose'

const personalDetailsSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  email: { type: String, required: true, lowercase: true, trim: true },
  fullName: { type: String, required: true, trim: true },
  phoneNumber: { type: String },
  location: {
    city: { type: String },
    state: { type: String },
    country: { type: String }
  },
  professionalSummary: { type: String },
}, { timestamps: true });

export default mongoose.model("PersonalDetails", personalDetailsSchema);
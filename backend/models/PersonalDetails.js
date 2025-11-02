import mongoose from 'mongoose'

const personalDetailsSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true
  },
  email: { type: String, lowercase: true, trim: true },
  fullname: { type: String, trim: true },
  phone: { type: String },
  location: {
    city: { type: String },
    state: { type: String },
    country: { type: String }
  },
  summary: { type: String },

  website: { type: String, trim: true, default: "" },
  github:  { type: String, trim: true, default: "" },
  linkedin: { type: String, trim: true, default: "" },
}, { timestamps: true });

export default mongoose.model("PersonalDetails", personalDetailsSchema);
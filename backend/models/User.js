import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
    return this.provider === "local";}
  },
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  provider: { type: String, default: "local" },
  provider_id: String,
  profile_picture: String,
  verifyOtp: {
    type: String,
    default: ''
   },
  verifyOtpExpireAt: {
    type: Number,
    default: 0
  },
  isAccountVerified: {
    type: Boolean,
    default: false
  },
  resetOtp: {
    type: String,
    default: ''
  },
  resetOtpExpireAt: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
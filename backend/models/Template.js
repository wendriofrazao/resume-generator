import mongoose from 'mongoose'

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Template", templateSchema);
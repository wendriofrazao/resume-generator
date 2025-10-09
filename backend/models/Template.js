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
  },
  
  htmlContent: {
    type: String,
    required: true
  },
  cssContent: {
    type: String,
    default: ''
  },
  variables: [{
    name: String,
    type: String, 
    required: Boolean,
    defaultValue: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("Template", templateSchema);
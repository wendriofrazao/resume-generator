import mongoose from 'mongoose'

const variableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  required: { type: Boolean, default: false },
  defaultValue: { type: mongoose.Schema.Types.Mixed }
});

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, required: true },
  htmlContent: { type: String, required: true },
  cssContent: { type: String, required: true },
  variables: [variableSchema],
  isActive: { type: Boolean, default: true }
});

export default mongoose.model('Template', templateSchema);
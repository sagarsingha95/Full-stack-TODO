import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  completionDate: { type: Date, default: null }, // date when completed
  category: { type: String, default: "Work" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true }); // createdAt, updatedAt automatically

const Task = mongoose.model('Task', taskSchema);
export default Task;  
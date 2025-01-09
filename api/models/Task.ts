import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: ['new', 'in_progress', 'complete'],
    }
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
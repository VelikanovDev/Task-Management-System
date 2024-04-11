const mongoose = require("mongoose").default;
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  isDone: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  assignedBy: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  due: {
    type: String,
    required: true,
  },
});

TaskSchema.post("save", (error, doc, next) => {
  if (error.name === "ValidationError") {
    const validationErrors = Object.values(error.errors).map(
      (err) => err.message,
    );
    next(new Error(validationErrors.join(",")));
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Task", TaskSchema);

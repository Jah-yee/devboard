const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  language: { type: String, default: "javascript" },
  code: { type: String, required: true },
});

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["backlog", "inprogress", "review", "done"],
      default: "backlog",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: [{ type: String }],
    snippets: [snippetSchema],
    githubIssueUrl: { type: String, default: "" },
    githubIssueNumber: { type: Number },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: Date },
    pomodoroCount: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);

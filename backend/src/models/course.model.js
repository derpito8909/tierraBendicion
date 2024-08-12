import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
  ],
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  requirement: {
    type: [String],
    required: true,
  },
});
export const courseModel = mongoose.model("course", courseSchema);

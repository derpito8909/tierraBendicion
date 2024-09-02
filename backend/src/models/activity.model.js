import mongoose, { Schema } from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    attendance: {
      type: Number,
      required: true,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const activityModel = new mongoose.model("activity", activitySchema);

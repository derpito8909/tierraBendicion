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
    activityLeader: [
      {
        type: Schema.Types.ObjectId,
        ref: "activityLeader",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const activityModel = new mongoose.model("activity", activitySchema);

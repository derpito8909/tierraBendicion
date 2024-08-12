import mongoose from "mongoose";
import { userModel } from "./user.model.js";

const activityLeaderSchema = new mongoose.Schema({
  isLeader: {
    type: Boolean,
    required: true,
    default: false,
  },
});
export const activityLeaderModel = userModel.discriminator("activityLeader", activityLeaderSchema);

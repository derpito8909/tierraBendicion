import mongoose from "mongoose";
import { userModel } from "./user.model.js";

const leaderActivitySchema = new mongoose.Schema({
  isLeader: {
    type: Boolean,
    required: true,
    default: false,
  },
});
export const leaderActivity = userModel.discriminator("leaderActivity", leaderActivity);

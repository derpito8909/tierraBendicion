import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    neighbourhood: {
      type: String,
      default: "Suba Rincon",
    },
    reference: {
      type: String,
    },
    cellPhoneNumber: {
      type: String,
      required: true,
    },
    visitAccepted: {
      type: Boolean,
      required: true,
    },
    visitTime: {
      type: String,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    prayerRequest: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    completedCourses: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const memberModel = mongoose.model("member", memberSchema);

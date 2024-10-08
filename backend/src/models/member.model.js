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
      type: String,
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
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const memberModel = mongoose.model("member", memberSchema);

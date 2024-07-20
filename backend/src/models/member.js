import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required,
  },
  lastName: {
    type: String,
    required,
  },
  age: {
    type: string,
    required,
  },
  gender: {
    type: String,
    required,
  },
  maritalStatus: {
    type: String,
    required,
  },
  cellPhoneNumber: {
    type: String,
    required,
  },
  prayerRequest: {
    type: String,
    required,
  },
  dateRegister: {
    type: Date,
    default: Date.now,
    required,
  },
  isActive: {
    type: Boolean,
    required,
  },
});
export const member = mongoose.model(member, memberSchema);

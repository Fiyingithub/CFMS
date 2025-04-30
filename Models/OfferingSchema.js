import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const offering = new Schema({
  offeringId: {
    type: String,
    default: uuidv4,
  },
  offeringRemittigAmount: {
    type: Number,
    required: [true, "Offering amount is required"],
  },
  month: {
    type: String,
    required: [true, "Month of offering is required"],
  },
  churchLocation: {
    type: String,
    required: [true, "Church location is required"],
  },
  remitterInfo: {
    type: {
        remitterName: String,
        remitterEmail: String,
    },
    required: [true, "Remiter information is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OfferingSchema = mongoose.model("Offering", offering);
export default OfferingSchema;

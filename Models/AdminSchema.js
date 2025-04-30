import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const AdminRouteSchema = new Schema({
  adminId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  adminName: {
    type: String,
    required: [true, "Admin name is required"],
  },
  adminEmail: {
    type: String,
    required: [true, "Admin email is required"],
    unique: true,
  },
  adminPhone: {
    type: String,
    required: [true, "Admin phone number is required"],
    unique: true,
  },
  adminPosition: {
    type: String,
    required: [true, "Admin position is required"],
  },
  church: {
    type: {
      churchName: String,
      churchLocation: String,
    },
    required: [true, "Church location is required"],
  },
  password: {
    type: String,
    required: [true, "Admin password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminSchema = mongoose.model("Admin", AdminRouteSchema);
export default AdminSchema;

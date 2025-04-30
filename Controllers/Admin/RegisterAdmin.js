import AdmminSchema from "../../Models/AdminSchema.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { toTitleCase } from "../../Utili/Format.js";
const newId = uuidv4();

const RegisterAdmin = async (req, res) => {
  try {
    const {
      adminName,
      adminEmail,
      adminPhone,
      adminPosition,
      church,
      password,
    } = req.body;
    if (
      !adminName ||
      !adminEmail ||
      !adminPhone ||
      !adminPosition ||
      // !church ||
      !password
    ) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    if(adminName === "string" || adminEmail === "string" || adminPhone === "string" || adminPosition === "string" || church === "string" || password === "string" ){
      return res.status(401).json({
        status:  false,
        message: "Invalid Parameters"
      })
    }

    // Check if the email already exists
    const existingAdmin = await AdmminSchema.findOne({ adminEmail });
    if (existingAdmin) {
      return res.status(400).json({
        status: false,
        message: "Admin with this email already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if the phone number already exists
    const existingPhone = await AdmminSchema.findOne({ adminPhone });
    if (existingPhone) {
      return res.status(400).json({
        status: false,
        message: "Admin with this phone number already exists",
      });
    }

    // const validPositions = [
    //   "Pastor",
    //   "Assistant Pastor",
    //   "Secretary",
    //   "Financial Secretary",
    // ];

    

    const formattedPosition = toTitleCase(adminPosition);

    // if (!validPositions.includes(formattedPosition)) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Admin position is not valid",
    //   });
    // }

    // Now, use formattedPosition for saving to DB or further logic

    const newAdmin = new AdmminSchema({
      adminId: newId,
      adminName,
      adminEmail,
      adminPhone,
      adminPosition: formattedPosition,
      church,
      password: hashedPassword,
    });
    // Save the new admin to the database
    await newAdmin.save();

    //   Remoeve the password from the response
    let adminData = {
      adminId: newAdmin.adminId,
      adminName: newAdmin.adminName,
      adminEmail: newAdmin.adminEmail,
      adminPhone: newAdmin.adminPhone,
      adminPosition: newAdmin.adminPosition,
      church: newAdmin.church,
    };

    res.status(201).json({
      status: true,
      message: "Admin registered successfully",
      data: adminData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};

export default RegisterAdmin;

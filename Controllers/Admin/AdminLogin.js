import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdminSchema from "../../Models/AdminSchema.js";

const AdminLogin = async (req, res) => {
  try {
    const { adminEmail, password } = req.body;
    if (!adminEmail || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    // Check if the email exists
    const existingAdmin = await AdminSchema.findOne({ adminEmail });
    if (!existingAdmin) {
      return res.status(400).json({
        status: false,
        message: "Account does not exist with this email",
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        status: false,
        message: "Password does not match with the email provided",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: existingAdmin.adminId,
        adminPostion: existingAdmin.adminPosition,
        adminEmail: existingAdmin.adminEmail,
      },

      process.env.JWT_SECRET,
      {
        expiresIn: "95d",
      }
    );

    const adminDto = {
      adminId: existingAdmin.adminId,
      adminName: existingAdmin.adminName,
      adminEmail: existingAdmin.adminEmail,
      adminPhone: existingAdmin.adminPhone,
      adminPostion: existingAdmin.adminPostion,
      church: existingAdmin.church,
    };

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      admin: adminDto,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export default AdminLogin;

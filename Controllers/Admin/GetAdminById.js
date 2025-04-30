import AdminSchema from "../../Models/AdminSchema.js";

const getAdminById = async (req, res) => {
  try {
    const { adminId } = req.params;
    if (!adminId) {
      return res.status(400).json({
        status: false,
        message: "Admin ID is required",
      });
    }

    // Check if the admin exists
    const existingAdmin = await AdminSchema.findOne({ adminId });
    if (!existingAdmin) {
      return res.status(404).json({
        status: false,
        message: "Admin not found",
      });
    }

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
      message: "Admin retrieved successfully",
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

export default getAdminById;

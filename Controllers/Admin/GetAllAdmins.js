import AdminSchema from "../../Models/AdminSchema.js";

const getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins
    const allAdmins = await AdminSchema.find({});

    if (!allAdmins || allAdmins.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No admins found",
      });
    }

    const adminDtos = allAdmins.map((admin) => ({
      adminId: admin.adminId,
      adminName: admin.adminName,
      adminEmail: admin.adminEmail,
      adminPhone: admin.adminPhone,
      adminPostion: admin.adminPostion,
      church: admin.church,
    }));

    return res.status(200).json({
      status: true,
      message: "Admins retrieved successfully",
      admins: adminDtos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export default getAllAdmins;

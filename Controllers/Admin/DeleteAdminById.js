import AdminSchema from "../../Models/AdminSchema.js";

const deleteAdminById = async (req, res) => {
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

    // Delete the admin
    await AdminSchema.deleteOne({ adminId });

    return res.status(200).json({
      status: true,
      message: "Admin deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export default deleteAdminById;

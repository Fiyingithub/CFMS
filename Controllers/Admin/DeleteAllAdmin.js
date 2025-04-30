import AdminSchema from "../../Models/AdminSchema.js";

const deleteAllAdmins = async (req, res) => {
  try {
    const allAdmins = await AdminSchema.find({});

    if (!allAdmins || allAdmins.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No admins found",
      });
    }

    // Delete all admins
    await AdminSchema.deleteMany({});
    return res.status(200).json({
      status: true,
      message: "All admins deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export default deleteAllAdmins;

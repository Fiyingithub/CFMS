import OfferingSchema from "../../Models/OfferingSchema.js";


const deleteOfferingById = async (req, res) => {
  try {
    const { offeringId } = req.params;
    if (!offeringId) {
      return res.status(400).json({
        status: false,
        message: "Offering ID is required",
      });
    }

    // Check if the admin exists
    const existingOffering = await OfferingSchema.findOne({ offeringId });
    if (!existingOffering) {
      return res.status(404).json({
        status: false,
        message: "Offering not found",
      });
    }

    // Delete the admin
    await OfferingSchema.deleteOne({ offeringId });

    return res.status(200).json({
      status: true,
      message: "Offering deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export default deleteOfferingById;

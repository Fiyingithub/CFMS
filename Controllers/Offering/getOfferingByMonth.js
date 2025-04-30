import OfferingSchema from "../../Models/OfferingSchema.js";

const getOfferingByMonth = async (req, res) => {
  try {
    const { month } = req.params;
    if (!month) {
      return res.status(401).json({
        status: false,
        message: "Month Is required",
      });
    }

    const existingMonthData = await OfferingSchema.find({ month: { $regex: new RegExp(`^${month}$`, "i") }, });

    if (!existingMonthData || existingMonthData.length === 0) {
      return res.status(404).json({
        status: false,
        message: `Offering not found for the month of ${month}`,
        existingMonthData
      });
    }

    return res.status(200).json({
      status: true,
      message: `Offering found for the month of ${month}`,
      existingMonthData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export default getOfferingByMonth;

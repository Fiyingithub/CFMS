import OfferingSchema from "../../Models/OfferingSchema.js"


const getAllOffering = async ( req, res )=> {
    try{ 
        const allOffering = await OfferingSchema.find({})
        if(!allOffering){
            return res.status(404).json({
                status: false,
                message: "No Offering Founf"
            })
        }

        res.status(200).json({
            status: true,
            message: "All Offering Retrieved Successfully",
            allOffering
        })

    }catch(error){
        console.error(error)
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

export default getAllOffering
import OfferingSchema from '../../Models/OfferingSchema.js'
import { toTitleCase } from '../../Utili/Format.js';


const addOffering = async (req, res) => {
    try{
        const {  offeringRemittigAmount, month, churchLocation, remitterInfo  } = req.body;

        if(!offeringRemittigAmount || !month || !churchLocation || !remitterInfo){
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            })
        }

        if(offeringRemittigAmount === "String" || month === "String" || churchLocation === "String"){
            return res.status(400).json({
                status: false,
                message: "Invalid Input"
            })
        }

        const formatedMonth = toTitleCase(month)

        // check month
        const validMonths = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        if(!validMonths.includes(formatedMonth)){
            return res.status(400).json({
                status: false,
                message: "Invalid month"
            })
        }

        // Check if offering already exists
        const existingOffering = await OfferingSchema.findOne({
            month: formatedMonth,
            churchLocation,
        });

        if (existingOffering) {
            return res.status(400).json({
                status: false,
                message: "Offering already exists"
            });
        }


        // New instance

        const offeringData = OfferingSchema.create({
            offeringRemittigAmount,
            month: formatedMonth,
            churchLocation: toTitleCase(churchLocation),
            remitterInfo,
        })


        // Create new offering
        res.status(200).json({
            status: true,
            message: "Offering added successfully",
            offeringData
        })


    }catch(error){
        console.error(error)
        return res.status(500).json({
           status: false,
           message: "Internal Server Error"
        })
    }
}


export default addOffering
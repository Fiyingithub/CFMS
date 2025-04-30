import express from "express";
import addOffering from "../Controllers/Offering/AddOffering.js";
import getAllOffering from "../Controllers/Offering/GetAllOffering.js";
import getOfferingByMonth from "../Controllers/Offering/getOfferingByMonth.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import { AuthorizeRole } from "../Middlewares/AuthorizeMiddleware.js";
import deleteOfferingById from "../Controllers/Offering/DeleteOfferingById.js";
const router = express.Router();


/**
 * @swagger
 * /offering/addOffering:
 *   post:
 *     summary: Add Offering by Authorized User
 *     description: Add Offering by Authorized User
 *     tags:
 *       - Offering
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offeringRemittigAmount:
 *                 type: number
 *               month:
 *                 type: string
 *               churchLocation:
 *                 type: string
 *               remitterInfo:
 *                 type: object
 *                 properties:
 *                   remitterName:
 *                     type: string
 *                   remitterEmail:
 *                     type: string
 *     responses:
 *       200:
 *         description: Offering added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/addOffering",verifyToken,AuthorizeRole("Pastor","Assistant Pastor","Secretary","Financial Secretary"),addOffering);

/**
 * @swagger
 * /offering/getAllOffering:
 *   get:
 *     summary: Get All Offerings
 *     description: Retrieve all offerings
 *     tags:
 *       - Offering
 *     responses:
 *       200:
 *         description: All offerings retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/getAllOffering", getAllOffering);

/**
 * @swagger
 * /offering/getOfferingByMonth/{month}:
 *   get:
 *     summary: Get Offering By Month
 *     description: Retrieve offering records for a specific month
 *     tags:
 *       - Offering
 *     parameters:
 *       - in: path
 *         name: month
 *         schema:
 *           type: string
 *         required: true
 *         description: Month to filter offering records by (e.g. "January")
 *     responses:
 *       200:
 *         description: Offering data retrieved successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/getOfferingByMonth/:month", getOfferingByMonth);

/**
 * @swagger
 * /offering/deleteOfferingById/{offeringId}:
 *   delete:
 *     summary: Delete Offering by ID
 *     tags: [Offering]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: offeringId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the offering to delete
 *     responses:
 *       200:
 *         description: Offering deleted successfully
 *       404:
 *         description: Offering not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteOfferingnById/:offeringId", verifyToken, deleteOfferingById);




const OfferingRoutes = router;
export default OfferingRoutes;

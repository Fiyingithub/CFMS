import express from "express";
import RegisterAdmin from "../Controllers/Admin/RegisterAdmin.js";
import AdminLogin from "../Controllers/Admin/AdminLogin.js";
import deleteAdminById from "../Controllers/Admin/DeleteAdminById.js";
import getAdminById from "../Controllers/Admin/GetAdminById.js";
import getAllAdmins from "../Controllers/Admin/GetAllAdmins.js";
import deleteAllAdmins from "../Controllers/Admin/DeleteAllAdmin.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import { AuthorizeRole } from "../Middlewares/AuthorizeMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - adminName
 *               - adminEmail
 *               - adminPhone
 *               - adminPosition
 *               - church
 *               - password
 *             properties:
 *               adminName:
 *                 type: string
 *               adminEmail:
 *                 type: string
 *               adminPhone:
 *                 type: string
 *               adminPosition:
 *                 type: string
 *               church:
 *                 type: object
 *                 properties:
 *                   churchName:
 *                     type: string
 *                   churchLocation:
 *                     type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/register", RegisterAdmin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               adminEmail:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", AdminLogin);

/**
 * @swagger
 * /admin/getAdminById/{adminId}:
 *   get:
 *     summary: Get admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the admin
 *     responses:
 *       200:
 *         description: Admin data retrieved successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.get("/getAdminById/:adminId", getAdminById);

/**
 * @swagger
 * /admin/getAllAdmins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all admins
 *       500:
 *         description: Internal server error
 */
router.get("/getAllAdmins", getAllAdmins);

/**
 * @swagger
 * /admin/deleteAdminById/{adminId}:
 *   delete:
 *     summary: Delete admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the admin to delete
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteAdminById/:adminId", deleteAdminById);

/**
 * @swagger
 * /admin/deleteAllAdmins:
 *   delete:
 *     summary: Delete all admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: All admins deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteAllAdmins", deleteAllAdmins);

const AdminRoutes = router;
export default AdminRoutes;

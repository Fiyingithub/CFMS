import express from 'express';
import AdminRoutes from './AdminRoutes.js';
import OfferingRoutes from './OfferingRoutes.js';
import { verifyToken } from '../Middlewares/AuthMiddleware.js';


const router = express.Router();

router.use('/admin', AdminRoutes);
router.use('/offering', verifyToken, OfferingRoutes);



const AllRoutes = router;

export default AllRoutes;
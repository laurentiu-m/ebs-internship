import { Router } from "express";
import authRoutes from "./authRoutes";
import chartsRoutes from "./chartsRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/charts", chartsRoutes);

export default router;

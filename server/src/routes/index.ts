import { Router } from "express";
import authRoutes from "./authRoutes";
import chartsRoutes from "./chartsRoutes";
import usersRoutes from "./usersRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/charts", chartsRoutes);
router.use("/users", usersRoutes);

export default router;

import express from "express";
import { createKPI, deleteKPI, getKPI } from "../controllers/kpiController.js";
const router = express.Router();

router.get("/kpi", getKPI);

router.post("/kpi", createKPI);

router.delete("/:id", deleteKPI);

export default router;

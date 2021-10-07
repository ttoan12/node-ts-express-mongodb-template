import { Router } from "express";
import roleController from "./role.controller";

const router = Router();

router.get("/roles", roleController.get);
router.post("/roles", roleController.post);

module.exports = router;

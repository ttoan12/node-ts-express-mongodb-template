import { Router } from "express";
import userController from "./user.controller";
import passport from "passport";
import { hasRole } from "../../middlewares/permission";

const router = Router();

router.get("/users", [passport.authenticate("jwt", { session: false }), hasRole("ADMIN")], userController.get);
router.post("/users", userController.post);

module.exports = router;

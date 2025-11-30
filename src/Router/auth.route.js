import { Router } from "express";
import {
  createAdminToken,
  googleSignIn,
  me,
} from "../Controller/auth.controller.js";

const router = Router();

router.post("/google-sign", googleSignIn);
router.post("/create-AdminToken", createAdminToken);
router.get("/me", me);

export default router;

import { Router } from "express";
import { googleSignIn, me } from "../Controller/auth.controller.js";

const router = Router();

router.post("/google-sign", googleSignIn);
router.get("/me", me);

export default router;

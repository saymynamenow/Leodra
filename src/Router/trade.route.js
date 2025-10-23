import { Router } from "express";
import {
  changePrice,
  changeStatus,
  createTrade,
  deleteTrade,
  deleteTradeByUserId,
  getTrade,
} from "../Controller/trade.controller.js";
import { authenticate } from "../Utils/jwt.utils.js";

const router = Router();

router.post("/", authenticate, createTrade);
router.get("/", authenticate, getTrade);
router.patch("/", authenticate, changeStatus);
router.patch("/price", authenticate, changePrice);
router.delete("/all", authenticate, deleteTradeByUserId);
router.delete("/:id", authenticate, deleteTrade);

export default router;

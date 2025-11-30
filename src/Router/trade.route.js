import { Router } from "express";
import {
  changePrice,
  changeStatus,
  createTrade,
  deleteTrade,
  deleteTradeByUserId,
  getImage,
  getTrade,
  uploadImage,
} from "../Controller/trade.controller.js";
import { authenticate } from "../Utils/jwt.utils.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post("/", authenticate, createTrade);
router.get("/", authenticate, getTrade);
router.patch("/", authenticate, changeStatus);
router.patch("/price", authenticate, changePrice);
router.delete("/all", authenticate, deleteTradeByUserId);

router.delete("/:id", authenticate, deleteTrade);

router.post("/upload", upload.single("image"), authenticate, uploadImage);

router.get("/image/:userId", authenticate, getImage);

export default router;

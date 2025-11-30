import {
  changePriceService,
  changeStatusService,
  createTradeService,
  deleteTradeService,
  deleteTradeServiceByUserId,
  getTradeService,
  uploadImageToDatabase,
  getImageFromDatabase,
} from "../Service/trade.service.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const createTrade = async (req, res) => {
  const d = req.body;
  const userId = req.user.id;

  const result = await createTradeService(d, userId);
  return res.json(result);
};

export const getTrade = async (req, res) => {
  const userId = req.user.id;
  const trades = await getTradeService(userId);
  return res.json(trades);
};

export const changePrice = async (req, res) => {
  const {
    id,
    tpPrice,
    NettSL,
    NetTP,
    slPercentage,
    tpPercentage,
    RrPips,
    TpPips,
    slPips,
  } = req.body;
  const userId = req.user.id;
  const trade = await changePriceService(
    id,
    tpPrice,
    NettSL,
    NetTP,
    slPercentage,
    tpPercentage,
    RrPips,
    TpPips,
    slPips
  );
  return res.json(trade);
};

export const deleteTradeByUserId = async (req, res) => {
  const userId = req.user.id;
  const trade = await deleteTradeServiceByUserId(userId);
  return res.json(trade);
};

export const changeStatus = async (req, res) => {
  const {
    id,
    status,
    outcome,
    exitTime,
    originalTpPrice,
    originalNettSL,
    originalNettTP,
    originalrrSlPercentage,
    originalrrTpPercentage,
    originalRrPips,
    originalTpPips,
    originalSlPips,
  } = req.body;
  const userId = req.user.id;
  const trade = await changeStatusService(
    id,
    status,
    userId,
    outcome,
    exitTime,
    originalTpPrice,
    originalNettSL,
    originalNettTP,
    originalrrSlPercentage,
    originalrrTpPercentage,
    originalRrPips,
    originalTpPips,
    originalSlPips
  );
  return res.json(trade);
};

export const deleteTrade = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const trade = await deleteTradeService(id, userId);
  return res.json(trade);
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageRecord = await uploadImageToDatabase(
      req.user.id,
      req.file.filename,
      req.body.tradeId
    );
    res.status(200).json({
      message: "File uploaded successfully",
      filePath: `/uploads/${req.file.filename}`,
      imageRecord,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading file", error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const imageRecord = await getImageFromDatabase(req.params.userId);
    if (!imageRecord) {
      return res.status(404).json({ message: "File not found in database" });
    }
    res.json(imageRecord);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching file", error: error.message });
  }
};

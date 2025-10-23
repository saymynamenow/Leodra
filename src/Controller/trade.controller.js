import {
  changePriceService,
  changeStatusService,
  createTradeService,
  deleteTradeService,
  deleteTradeServiceByUserId,
  getTradeService,
} from "../Service/trade.service.js";

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
  console.log(req.body);
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

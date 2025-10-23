import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export const createTradeService = async (d, userId) => {
  try {
    const trade = await prisma.trade.create({
      data: {
        rowId: d.rowId,
        symbol: d.symbol,
        tradeType: d.tradeType,
        balance: d.balance,
        entryTime: new Date(d.entryTime),
        openPrice: d.openPrice,
        slPrice: d.slPrice,
        tpPrice: d.tpPrice,
        priceNow: d.priceNow,
        pendingPips: d.pendingPips,
        slPips: d.slPips,
        tpPips: d.tpPips,
        rrPips: d.rrPips,
        rrSlPercentage: d.rrPercentage.sl,
        rrTpPercentage: d.rrPercentage.tp,
        lotSize: d.lotSize,
        nettSL: d.nettSL,
        nettTP: d.nettTP,
        error: d.error,
        assetDecimals: d.assetData.decimals,
        assetPipValue: d.assetData.pipValue,
        assetContract: d.assetData.contractSize,
        assetType: d.assetData.type,
        assetCurrency: d.assetData.currency,
        assetMinLot: d.assetData.minLotIncrement,
        assetPipsDec: d.assetData.pipsDecimals,
        riskPercent: d.riskPercent,
        note: d.note,
        userId: userId,
      },
    });
    return trade;
  } catch (error) {
    console.error("Error creating trade:", error);
  }
};

export const getTradeService = async (userId) => {
  try {
    const calculated = await prisma.trade.findMany({
      where: { status: "CALCULATED", userId: userId },
    });

    const running = await prisma.trade.findMany({
      where: { status: "RUNNING", userId: userId },
    });

    const executed = await prisma.trade.findMany({
      where: { status: "EXECUTED", userId: userId },
    });

    return {
      calculated: calculated.map(formatTrade),
      running: running.map(formatTrade),
      executed: executed.map(formatTrade),
    };
  } catch (error) {
    console.error("Error getting trades:", error);
  }
};

export const changePriceService = async (
  id,
  tpPrice,
  NettSL,
  NetTP,
  slPercentage,
  tpPercentage,
  RrPips,
  TpPips,
  slPips
) => {
  const trade = await prisma.trade.update({
    where: { id: id },
    data: {
      tpPrice: tpPrice,
      nettSL: NettSL,
      nettTP: NetTP,
      rrSlPercentage: slPercentage,
      rrTpPercentage: tpPercentage,
      rrPips: RrPips,
      tpPips: TpPips,
      slPips: slPips,
    },
  });
  return trade;
};

export const deleteTradeServiceByUserId = async (userId) => {
  try {
    const trade = await prisma.trade.deleteMany({
      where: { userId: userId, status: "EXECUTED" },
    });
    return trade;
  } catch (error) {
    console.error("Error deleting trades by userId:", error);
  }
};

export const changeStatusService = async (
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
) => {
  try {
    const trade = await prisma.trade.update({
      where: { id: id, userId: userId },
      data: {
        status: status,
        outcome: outcome,
        exitTime: exitTime ? new Date(exitTime) : null,
        originalNettSL: originalNettSL,
        originalNettTP: originalNettTP,
        originalrrSlPercentage: originalrrSlPercentage,
        originalrrTpPercentage: originalrrTpPercentage,
        originalRrPips: originalRrPips,
        originalTpPips: originalTpPips,
        originalTpPrice: originalTpPrice,
        originalSlPips: originalSlPips,
      },
    });
    return trade;
  } catch (error) {
    console.error("Error changing trade status:", error);
  }
};

export const deleteTradeService = async (id, userId) => {
  try {
    const trade = await prisma.trade.delete({
      where: { id: id, userId: userId },
    });
    return trade;
  } catch (error) {
    console.error("Error deleting trade:", error);
  }
};

function formatTrade(trade) {
  return {
    id: trade.id,
    rowId: trade.rowId,
    symbol: trade.symbol,
    tradeType: trade.tradeType,
    balance: trade.balance,
    entryTime: trade.entryTime,
    openPrice: trade.openPrice,
    slPrice: trade.slPrice,
    tpPrice: trade.tpPrice,
    priceNow: trade.priceNow,
    pendingPips: trade.pendingPips,
    slPips: trade.slPips,
    tpPips: trade.tpPips,
    rrPips: trade.rrPips,
    rrPercentage: {
      sl: trade.rrSlPercentage,
      tp: trade.rrTpPercentage,
    },
    lotSize: trade.lotSize,
    nettSL: trade.nettSL,
    nettTP: trade.nettTP,
    error: trade.error,
    assetData: {
      decimals: trade.assetDecimals,
      pipValue: trade.assetPipValue,
      contractSize: trade.assetContract,
      type: trade.assetType,
      currency: trade.assetCurrency,
      minLotIncrement: trade.assetMinLot,
      pipsDecimals: trade.assetPipsDec,
    },
    riskPercent: trade.riskPercent,
    note: trade.note,
    outcome: trade.outcome,
    timestamp: trade.exitTime,
    originalNettSL: trade.originalNettSL,
    originalNettTP: trade.originalNettTP,
    originalRrPercentage: {
      sl: trade.originalrrSlPercentage,
      tp: trade.originalrrTpPercentage,
    },
    originalRrPips: trade.originalRrPips,
    originalTpPips: trade.originalTpPips,
    originalTpPrice: trade.originalTpPrice,
  };
}

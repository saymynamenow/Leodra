import e from "express";
import authRoute from "./Router/auth.route.js";
import tradeRoute from "./Router/trade.route.js";
const app = e();

app.use("/auth", authRoute);
app.use("/trade", tradeRoute);
export default app;

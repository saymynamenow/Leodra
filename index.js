import e from "express";
import dotenv from "dotenv";
import route from "./src/route.js";
import cors from "cors";
dotenv.config();
const app = e();

app.use(e.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.options(/.*/, cors());

app.use("/api", route);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

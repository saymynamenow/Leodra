import e from "express";
import dotenv from "dotenv";
import route from "./src/route.js";
import cors from "cors";
import path from "path";
dotenv.config();
const app = e();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(e.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.options(/.*/, cors());
app.use("/uploads", e.static(path.join(__dirname, "uploads")));
app.use("/api", route);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

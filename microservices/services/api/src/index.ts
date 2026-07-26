import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 7000;
import Routes from "./routes/index.js";

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("API Service is working 🙌");
});

// * Routes
app.use("/api", Routes);

app.listen(PORT, () => console.log(`API Server is running on PORT ${PORT}`));

import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
const app: Application = express();
const PORT = process.env.PORT || 7001;
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.js";
import { instrument } from "@socket.io/admin-ui";
import { connectKafkaProducer } from "./config/kafka.config.js";

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_APP_URL!, "https://admin.socket.io"],
  },
  adapter: createAdapter(redis),
});

instrument(io, {
  auth: false,
  mode: "development",
});

export { io };
setupSocket(io);

// * Middleware
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.send("WebSocket Service is working 🙌");
});

// * Add Kafka Producer
connectKafkaProducer().catch((err) => console.log("Kafka Producer error", err));

server.listen(PORT, () => console.log(`WebSocket Server is running on PORT ${PORT}`));

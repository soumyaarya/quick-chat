import "dotenv/config";
import { consumeMessages } from "./helper.js";

console.log("Worker Service is booting up...");

consumeMessages(process.env.KAFKA_TOPIC!).catch((err) =>
  console.log("The Kafka Consume error", err)
);

import { Queue } from "bullmq";

const connection = { host: "localhost", port: 6379 };
export const transferQueue = new Queue("transfers", { connection });
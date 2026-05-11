import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL!,
});

export default prisma;
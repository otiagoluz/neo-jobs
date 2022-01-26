/**
 * Required External Modules
*/

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { jobsRouter } from "./routers/jobs.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;
const HOSTNAME = process.env.HOST_NAME || 'http://localhost';

const app = express();

(async () => {
  const db = await open({
    filename: '/tmp/database.db',
    driver: sqlite3.Database
  })
})()
sqlite3.verbose()


app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000']
}));
app.use(express.json());

app.use("/api", jobsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
*/

app.listen(PORT, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`);
});



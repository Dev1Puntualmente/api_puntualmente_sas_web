import cors from "cors";
import "reflect-metadata";
import express, { Express } from "express";

import getIpClient from "./middlewares/getIpClient";
import { allowedOrigins, allowedHeaders, allowedMethods } from "./config/app/environmentConfig";



const app: Express = express();

app.use(
  cors({
    origin: allowedOrigins,
    methods: allowedMethods,
    allowedHeaders: allowedHeaders,
  })
);


getIpClient(app);

app.use(express.json());

export default app;
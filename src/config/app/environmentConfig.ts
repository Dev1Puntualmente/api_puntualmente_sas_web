import * as dotenv from "dotenv"
dotenv.config();

export const isProduction = process.env.NODE_ENV === "production";

export const baseDir = isProduction ? "dist" : "src";
export const fileExt = isProduction ? "js" : "ts";

export const allowedHeaders = [
    "Content-Type",
    "Access-Control-Allow-Origin"
];

export const allowedOrigins = isProduction ? ["https://puntualmente.co",
    "https://www.puntualmente.co"] : ["http://localhost:5173", "https://puntualmente.innoval.tech"];


export const allowedMethods = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
]
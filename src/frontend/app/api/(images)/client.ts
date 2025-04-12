import { Client } from "minio"

export const client = new Client({
    endPoint: process.env.MINIO_ENDPOINT || "localhost",
    port: parseInt(process.env.MINIO_PORT || "9000"),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY || "hwX4XvLgbT6Oy1bnPx3d",
    secretKey: process.env.MINIO_SECRET_KEY || "smWbiyZuHASpVZyr4gmbXeVHH7rgKkcFD2d3gS6J",
})
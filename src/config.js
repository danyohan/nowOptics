import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb+srv://danyohan10:4Wsl168AyC1C6FTP@nowoptics.rpfs3bi.mongodb.net/"
import { connect } from "mongoose";
import { MONGODB_URI } from "./config";
import LogModel from "../models/logs";
import Log from "../lib/log";
import TypeError from "../lib/logEnum";

export const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
  } catch (error) {
    Log({
      info: error,
      type: TypeError.Error,
      function: "connect"
    }, LogModel);
  }
};

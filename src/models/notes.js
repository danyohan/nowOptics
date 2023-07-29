import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default model("notes", schema);
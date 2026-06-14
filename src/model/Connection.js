import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({

 toUserId:{
 type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true

 },
 fromUserId:{

 type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true

 },
  status: {
  type: String,
  enum: ["interested", "ignored", "accepted", "rejected"],
  required: true
}

}, {
    timestamps: true
  })


const Connection = mongoose.model("Connection",connectionSchema);


export default Connection;
import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
  conversationId : {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref : "Conversation"
  },
   senderId : {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref : "User"
  },
  message : {
     type:String,
     required:true,
     maxlength:1600,
     trim : true,
  }
},{
    timestamps: true
  });


const Message = mongoose.model("Message",messageSchema);

export default Message;
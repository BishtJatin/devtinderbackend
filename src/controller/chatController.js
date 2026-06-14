import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";
import { getIO } from "../socket/socket.js";


export const createConversation = async(req,res) => {
try {

    
   const userId = req.user._id;
   const {friendId} = req.params;

  let conversation = await Conversation.findOne({
    participants : {
        $all: [userId, friendId]
      }
  });

  if(!conversation){

    conversation = await Conversation.create({
         participants : [
        userId,friendId
    ]
    })
  }

   return res.status(200).json({
      success: true,
      conversation
    });

    
} catch (error) {
     res.status(500).json({
      message: error.message
    });
}


}


export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;

    const { conversationId } = req.params;
    const {  message } = req.body;

    const newMessage = await Message.create({
      conversationId,
      senderId,
       message
    });

     // Find conversation
    const conversation = await Conversation.findById(
      conversationId
    );


  if (!conversation) {
  return res.status(404).json({
    message: "Conversation not found"
  });
  }
      // Find receiver
    const receiverId = conversation.participants.find(
      (id) => id.toString() !== senderId.toString()
    );


     getIO()
      .to(receiverId.toString())
      .emit("newMessage", newMessage);

    return res.status(201).json({
      success: true,
      newMessage
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId
    })
    .populate("senderId", "userName profilePic")
    .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      messages
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllUserConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id
    })
    .populate("participants", "userName profilePic");

    return res.status(200).json({
      success: true,
      conversations
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
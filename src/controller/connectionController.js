import Connection from "../model/Connection.js";
import User from "../model/User.js";



export const sendRequest = async(req,res) => {
  try {
    const fromUserId = req.user._id;
   const { status, toUserId } = req.params;

    if (fromUserId.toString() === toUserId) {
      return res.status(400).json({
        message: "You cannot send a request to yourself"
      });
    }

    const allowedStatus = ["interested", "ignored"];

if (!allowedStatus.includes(status)) {
  return res.status(400).json({
    message: "Invalid status type"
  });
}

    const targetUser = await User.findById(toUserId);

if (!targetUser) {
  return res.status(404).json({
    message: "User not found"
  });
}

const existingConnection = await Connection.findOne({
  $or: [
    { fromUserId, toUserId },
    { fromUserId: toUserId, toUserId: fromUserId }
  ]
});

if (existingConnection) {
  return res.status(400).json({
    message: "Connection request already exists"
  });
}

const connection = await Connection.create({
  fromUserId,
  toUserId,
  status
});

return res.status(201).json({
  success: true,
  message: `Request ${status} successfully`,
  connection
});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}

export const  reviewRequest  = async(req,res) => {
try {
const { status, requestId } = req.params;

const allowedStatus = ["accepted", "rejected"];

if (!allowedStatus.includes(status)) {
  return res.status(400).json({
    message: "Invalid status"
  });
}

const connection = await Connection.findOne({
  _id: requestId,
  toUserId: req.user._id,
  status: "interested"
});

if (!connection) {
  return res.status(404).json({
    message: "Connection request not found"
  });
}

connection.status = status;

await connection.save();

return res.status(200).json({
  success: true,
  message: `Request ${status} successfully`
});
    
} catch (error) {
     res.status(500).json({
      message: error.message
    });
}
}

export const getConnection = async(req,res) =>{
  try {
    const loggedInUser = req.user._id;

   const connections = await Connection.find({
  $or: [
    { toUserId: loggedInUser, status: "accepted" },
    { fromUserId: loggedInUser, status: "accepted" }
  ]
})
.populate("fromUserId", "userName profilePic bio")
.populate("toUserId", "userName profilePic bio");

    return res.status(200).json({
      success: true,
      connections
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }

}

export const getPendingRequests = async(req,res) =>{
  try {
    const loggedInUser = req.user._id;

    const requests = await Connection.find({
      toUserId: loggedInUser,
      status: "interested"
    }).populate("fromUserId", "userName profilePic bio skills");

    return res.status(200).json({
      success: true,
      requests
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}
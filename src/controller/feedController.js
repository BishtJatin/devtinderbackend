
import User from "../model/User.js";
import Connection from "../model/Connection.js";


export const feed = async (req,res) => {

   const loggedInUserId = req.user._id;

const connections = await Connection.find({
  $or: [
    { fromUserId: loggedInUserId },
    { toUserId: loggedInUserId }
  ]
});

const hiddenUsers = new Set();

connections.forEach((connection) => {
  hiddenUsers.add(connection.fromUserId.toString());
  hiddenUsers.add(connection.toUserId.toString());
});

hiddenUsers.add(loggedInUserId.toString());

  const users = await User.find({
      _id: {
        $nin: [...hiddenUsers]
      }
    }).select("userName bio profilePic skills");

    return res.status(200).json({
      success: true,
      users
    });

}


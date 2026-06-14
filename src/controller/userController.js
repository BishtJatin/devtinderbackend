import User from "../model/User.js";


export const userProfile =  (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const userProfileUpdate = async (req,res) => {

    try {
   
       const allowedUpdates = [
          "password",
      "skills",
      "profilePic",
      "bio"
       ]


       const updates = Object.keys(req.body);

       const isValidOperation = updates.every((field) => {
        return allowedUpdates.includes(field)
       })

          if (!isValidOperation) {
      return res.status(400).json({
        message: "Invalid updates"
      });
    }

    const user = req.user;
     
     updates.forEach((field) => {
      user[field] = req.body[field];
    });
    
      await user.save();

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

};
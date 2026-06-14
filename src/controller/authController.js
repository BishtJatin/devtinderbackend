import User from "../model/User.js"



export const signUp = async (req,res) => {

    try {

         const { userName,emailId,password } = req.body;

     const findUser = await User.findOne({emailId});

     if( findUser) {
        return res.status(400).json({
  message: "User already exists"
});
     }

const user = await User.create({
  userName,
  emailId,
  password
});

const token = user.getJWT();

res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000
});

return res.status(201).json({
  success: true,
  message: "User registered successfully"
});
        
    } catch (error) {
        console.log(error);

          return res.status(500).json({
      success: false,
      message: error.message
    });
    }

   

}


export const login = async (req,res) => {
 
try {

    
    const {emailId,password} = req.body;

    const findUser = await User.findOne({ emailId });
    if(!findUser){
          return res.status(401).json({
  message: "Invalid credentials"
});
    }

    
    const passwordMatch = await findUser.comparePassword(password);

    if(!passwordMatch){
         return res.status(401).json({
  message: "Invalid credentials"
});
    }
     

    const token = findUser.getJWT();

res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000
});

return res.status(200).json({
  success: true,
  message: "Login successful"
});

    
} catch (error) {
        console.log(error);

          return res.status(500).json({
      success: false,
      message: error.message
    });
    }
}


export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
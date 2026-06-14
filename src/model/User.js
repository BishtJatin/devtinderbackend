import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({

  userName:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:10
  },
  emailId : {
     type:String,
    required:true,
     unique: true,
    lowercase: true,
    trim:true,
     validate: {
      validator: validator.isEmail,
      message: "Invalid email"
    }
  },
  password : {
    type:String,
    required:true,
    validate : {
        validator : (value) => validator.isStrongPassword(value),
        message: "Password is not strong enough"
    }
  },
   profilePic: {
    type: String,
     default: "https://tse1.mm.bing.net/th/id/OIP.hyLsJh3chqROf-s7RoNsEAHaHX?pid=Api&P=0&h=180",
    validate: {
      validator: validator.isURL,
      message: "Invalid image URL"
    }
  },
  skills: {
  type: [String],
  validate: {
    validator: function (value) {
      return (
        value.length <= 50 &&
        value.every(skill => skill.length <= 30)
      );
    },
    message: "Maximum 50 skills and each skill must be under 30 characters"
  }
}
,
bio: {
  type: String,
  default: "Hey there! I am using DevTinder."
}
}, {
    timestamps: true
  });

userSchema.pre("save", async function () {

  if(!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password,10);

})

userSchema.methods.comparePassword = async function(password){

   return await bcrypt.compare(password,this.password);

}

userSchema.methods.getJWT = function (){
     return jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

const User = mongoose.model("User",userSchema);

export default User;
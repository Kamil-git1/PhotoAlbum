const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)
//populate
userSchema.virtual('collections', {
  ref:'Collection',
  foreignField:'user',
  localField:'_id'
})

//Hash password
userSchema.pre("save", async function (next) {
  if(!this.isModified('password')){
    next();
  }
  //hash password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//match password 
userSchema.methods.isPasswordMatched = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

//Compile schema into model
const User = mongoose.model("User", userSchema)

module.exports = User

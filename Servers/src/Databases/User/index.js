import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const Userschema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],
  },
  {
    timestamps: true,
  }
);
Userschema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, process.env.SECRET_KEY);
};

Userschema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  const checkByEmail = await Usermodel.findOne({ email });
  const checkByPhone = await Usermodel.findOne({ phoneNumber });
  if (checkByEmail || checkByPhone) {
    throw new Error("User already Exist!!");
  }
  return false;
};
Userschema.statics.findByEmailAndPassword = async ({ email, password }) => {
  const checkUser = await Usermodel.findOne({ email });
  if (!checkUser) {
    throw new Error("User does not exist!!");
  }
  const passwordcheck = await bcrypt.compare(password, checkUser.password);
  if (!passwordcheck) {
    throw new Error("Inavlid Credential!!");
  }
  return checkUser;
};
Userschema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      user.password = hash;
      return next();
    });
  });
});

export const Usermodel = mongoose.model("users", Userschema);

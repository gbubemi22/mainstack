import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import constant from "../constant";

export interface UserDocument extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  type: string;
  
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument>({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  last_name: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    required: [true, "Please provide your email"],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  phone_number: {
    type: String,
    required: [true, "Please provide your phone number"],
    max: [14, "Number should not be more than 14 digits"],
    unique: true,
  },
  type: {
    type: String,
    enum: Object.values(constant.ACCOUNT_TYPES),
    default: constant.ACCOUNT_TYPES.USER,
  },
  
}, {timestamps: true,});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(16);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;

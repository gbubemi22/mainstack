import mongoose, { Schema } from "mongoose";

export interface ProductDocument extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  company: string;
  colors: [string];
  userId: mongoose.Types.ObjectId;
  
}

const ProductSchema = new mongoose.Schema<ProductDocument>({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide  product name"],
    maxlength: [100, "Name can not be more than 100 Words"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxlength: [1000, "Description can not be more than 1000 characters"],
  },
  image: {
    type: String,
    default: "/uploads/example.jpeg",
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
    enum: ["office", "kitchen", "bedroom","mobile"],
  },
  company: {
    type: String,
    required: [true, "please provide company"],
    enum: {
      values: ["ikea", "liddy", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
  colors: {
    type: [String],
    default: ["#222"],
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
}, {timestamps: true,});

const Product = mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;

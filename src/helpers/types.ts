import mongoose from "mongoose";

export type ProductDataType = {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  company: string;
  colors: [string];
  userId: string;
};

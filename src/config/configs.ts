import * as dotenv from "dotenv";
dotenv.config();



export const configs =  {
     MONGO_URI: process.env.MONGO_URI as string,
     JWT_COOKIE:process.env.JWT_COOKIE,
     ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
     JWT_SECRET:process.env.JWT_SECRET
}
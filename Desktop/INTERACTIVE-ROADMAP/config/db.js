import mongoose from "mongoose";
import 'dotenv/config';

const URL = process.env.MONGOURL;

// database connection
export const dbConnection = () => {
  mongoose
  .connect(URL)
  .then(() => {
    console.log('App connected to datebase');
  })
  .catch((error) => {
    console.log(error);
  });
}
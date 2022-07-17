import express from "express";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from  'cors'

// routers
import AuthRoute from "./Routes/AuthRoute.js"
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import UploadRoute from './Routes/UploadRoute.js'


const app = express();
// to serve images for public

app.use(express.static('public'))
app.use('/images', express.static("images"))


//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())



dotenv.config()
const PORT = process.env.PORT;

mongoose
  .connect(
    process.env.MONGO_DB,
    {useNewUrlParser: true, useUnifiedTopology:true}
  )
  .then(() => app.listen(5000, () => console.log("Listening")))
  .catch((error)=> console.log(error));

  //usage of routes

  app.use('/auth', AuthRoute)

  app.use('/user', UserRoute)

  app.use('/posts', PostRoute)

  app.use('/upload', UploadRoute)

  

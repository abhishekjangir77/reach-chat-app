  import dotenv from "dotenv"
  dotenv.config()
  import express from "express" ;
  import authRoutes from "./Routes/auth.routes.js";
  import messageRoutes from "./Routes/message.router.js"
  import { connectDb } from "./lib/db.js";
  import cookieparser from "cookie-parser"
  import cors from "cors"
  import { app , server } from "./lib/socket.js";


  const PORT = process.env.PORT

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  app.use(cookieparser())
  app.use(cors({
    origin: "https://reach-chat-app.vercel.app",
    credentials: true,
  }));

  app.use("/api/auth",authRoutes)
  app.use("/api/message",messageRoutes)

  server.listen(PORT , () =>{
      console.log('server is runing on port :'+PORT);
      console.log(process.env.MONGO_URI);
      connectDb()
  })
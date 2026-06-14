import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectionRouter from "./routes/connectionRoutes.js";
import feedRouter from "./routes/feedRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import http from "http";
import { initSocket } from "./socket/socket.js";
import aiRouter from "./routes/aiRouter.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRouter);
app.use("/auth",userRouter);
app.use("/auth",connectionRouter);
app.use("/auth",feedRouter);
app.use("/chat",chatRouter);
app.use("/chat",aiRouter)


const server = http.createServer(app)
initSocket(server);

const PORT = process.env.PORT ?? 8000;


connectDB().then(()=>{
server.listen(PORT, ( )=>{
  console.log(`server is listning on Port ${PORT}`);
});

})
.catch((err)=>{
   console.log(err)
})


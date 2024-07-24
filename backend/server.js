import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from './routes/user.route.js';
import connectToMongoDB from "./db/connecToMongoDB.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000 ;


dotenv.config() ;
app.use(express.json()) ;
app.use(cookieParser()) ;


// API ROUTES
app.use('/api/auth', authRoutes) ;
app.use('/api/messages', messageRoutes) ;
app.use('/api/users', userRoutes) ;

const corsOptions ={
   origin:'*', 
   credentials:true,    
   optionSuccessStatus:200,
}

server.listen(PORT, () => {
    connectToMongoDB();
    console.log('SERVER RUNNING ON PORT '+ PORT) ;
});
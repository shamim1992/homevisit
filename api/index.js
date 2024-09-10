import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import mongoose from "mongoose";


import userAuths from './routes/userAuth.js'
import adminRoutes from './routes/adminRoutes.js';
import physioRoutes from './routes/physioRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("Database connection established")});



app.use("/api/auth", userAuths);
app.use('/api/admin', adminRoutes);
app.use('/api/physio', physioRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log("server is running")
})



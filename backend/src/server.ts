
//import
import express from "express";
import 'dotenv/config'
import router from "./router"
import {connectDB} from './config/db'

//instancia de express
const app = express();
connectDB();
//routing
app.use('/api', router);

export default app;
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.config.js';
import routes from './routes/index.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' })


const server = express()
server.use(cors());
server.use(express.json());

const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Server is running`);
})
connectDB();

server.use('/',routes)
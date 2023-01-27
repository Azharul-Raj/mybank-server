import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.config.js';
import register from './controllers/userController.js';

const app = express();
app.use(cors());
app.use(express.json());
const router=express.Router()

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running`);
})
connectDB();

router.post('/register',register)
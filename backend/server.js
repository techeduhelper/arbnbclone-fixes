import express from 'express';
import colors from 'colors'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './db.js';
import authRoutes from "./routes/authRoutes.js";
import placeRoutes from './routes/placeRoute.js'

// config dotenv
dotenv.config()

// datbase connection
connectDB();


// Rest object
const app = express();
const PORT = process.env.PORT || 8000;

// midlewares
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Routes
app.use('/api/arrbnb/v1/auth', authRoutes);
app.use('/api/arrbnb/v1/place', placeRoutes);

// rest api
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to the Arbnb-clone API"
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.white.bgCyan)
})


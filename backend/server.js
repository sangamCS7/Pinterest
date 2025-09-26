// Import necessary packages
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

// Import route handlers
import authRoutes from './routes/auth.routes.js';
import pinRoutes from './routes/pin.routes.js';
import userRoutes from './routes/user.routes.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---
// Enable Cross-Origin Resource Sharing (CORS) for all routes
// This allows the frontend (running on a different port) to communicate with the backend.
app.use(cors());

// Parse incoming JSON requests and put the parsed data in req.body
app.use(express.json());

// Parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Log HTTP requests to the console in 'dev' format for debugging
app.use(morgan('dev'));


// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

connectDB();


// --- API Routes ---
// Mount the route handlers for specific API endpoints
app.use('/api/auth', authRoutes);
app.use('/api/pins', pinRoutes);
app.use('/api/users', userRoutes);

// --- Root Endpoint ---
app.get('/', (req, res) => {
    res.send('Pinterest Clone API is running...');
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


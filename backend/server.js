import dns from 'node:dns/promises';
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';


const port= process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors())
// Body parser middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleWare
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json('Api is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes );
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () =>
console.log(`Server is running on port ${port}`)
);
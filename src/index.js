import express from 'express';
import mongoose  from 'mongoose';
import connectDB from './config/dbConn';

// routers
import home from './routes/home';
import categories from './routes/api/categories';

const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);
app.use('/categories',categories);

// Set `strictQuery` to `false` to prepare for the change
mongoose.set('strictQuery', false);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    const PORT = process.env.port || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); 
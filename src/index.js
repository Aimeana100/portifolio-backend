import express from 'express';
import connectDB from './config/dbConn';
import mongoose from 'mongoose';
// routers
import home from './routes/home';
import categoriesRouter from './routes/api/categories';
import blogRouter from './routes/api//blogs';
import contactRouter from './routes/api/contacts';
import commentRouter from './routes/api/comments';

const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);
app.use('/categories',categoriesRouter);
app.use('/blogs',blogRouter);
app.use('/contacts',contactRouter);
app.use('/comments', commentRouter);


// Set `strictQuery` to `false` to prepare for the change
mongoose.set('strictQuery', false);
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    const PORT = process.env.port || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); 
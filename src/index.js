import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/dbConn';
import dotenv from 'dotenv'

// routers
import home from './routes/home';
import categoriesRouter from './routes/api/categories';
import blogRouter from './routes/api/blogs';
import contactRouter from './routes/api/contacts';
import commentRouter from './routes/api/comments';
import userRouter from './routes/api/users';
import registerRouter from './routes/register';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import upload from './config/multer';
import {swaggerDocRouter} from './documentantion';
import corsOptions from './middleware/corsOptions';

const app = express();
dotenv.config();
connectDB();


// Cross Origin Resource Sharing
// app.use(cors(corsOptions));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);

app.use('/api/auth/register', registerRouter);
app.use('/api/auth/login', loginRouter);
app.use('/api/auth/logout', logoutRouter);

app.use('/api/categories', categoriesRouter);
app.use('/api/blogs',upload.single('image'), blogRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/comments', commentRouter);
app.use('/api/users', userRouter);

app.use(swaggerDocRouter);

app.all('*', (req, res) => {
  return  res.status(404).json({ "error": "404 Not Found" });
});

// Set `strictQuery` to `false` to prepare for the change
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  let PORT = NODE_ENV='test' ? 4000 :  process.env.port || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;
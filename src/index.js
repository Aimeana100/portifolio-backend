import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/dbConn';
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


import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from'swagger-ui-express';

const app = express();
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerObtions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portifolio API Documentation',
      version: '1.0.0'
    },
  servers: [
    {
      url: 'http://127.0.0.1:5000/'
    }
  ]
},
  apis: ['./index.js']
};

const swaggerSpec = swaggerJSDoc(swaggerObtions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 *  /:
 *   get:
 *    summary: Home
 */


app.use('/', home);
app.use('/register', registerRouter);
app.use('/auth', loginRouter);
app.use('/logout', logoutRouter);

app.use('/categories', categoriesRouter);
app.use('/blogs',upload.single('image'), blogRouter);
app.use('/contacts', contactRouter);
app.use('/comments', commentRouter);
app.use('/users', userRouter);

app.all('*', (req, res) => {
  return  res.status(404).json({ "error": "404 Not Found" });
});

// Set `strictQuery` to `false` to prepare for the change
mongoose.set('strictQuery', false);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  const PORT = process.env.port || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

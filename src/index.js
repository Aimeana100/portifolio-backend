import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/dbConn';
import dotenv from 'dotenv'

// routers
import home from './routes/home';

// import corsOptions from './middleware/corsOptions';

const { NODE_ENV } = process.env;

const app = express();
dotenv.config();
connectDB();

// Cross Origin Resource Sharing

// app.use(cors(corsOptions));
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home);


app.all('*', (req, res) => {
  return  res.status(404).json({ "error": "404 Not Found" });
});

// Set `strictQuery` to `false` to prepare for the change
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  let PORT = NODE_ENV==='test' ? 4000 :  process.env.port || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;
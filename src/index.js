import express from 'express';
import mongoose  from 'mongoose';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => { return res.status(200).json({message: "The app is operating healthly"}) })

app.listen(5000, ()=> {console.log('servver is running on port 5000');});
import  Express  from "express";
import express from 'express';
import { connectDB } from './config/db';
import 'dotenv/config';

const app = express();

app.use(express.json());


connectDB();


app.use((req, res, next) => {
  return res.status(404).json({
    message: 'Route not found ! ',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running in port 5000');
});
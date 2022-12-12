import express from 'express';
import { connectDB } from './config/db';
import 'dotenv/config';
import authRouter from './route/auth.routes';
import userRouter from './route/user.route';

const app = express();

app.use(express.json());


connectDB();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/consultant', userRouter);


app.use((req, res) => {
  return res.status(404).json({
    message: 'Route not found ! ',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running in port 5000');
});
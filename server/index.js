import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import {validationResult} from "express-validator";
import {registerValidation} from "./validations/auth.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('DB is ok');
  })
  .catch((err) => {
    console.log('Error', err);
  })

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});

app.post('/auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  })
});

export const viteNodeApp = app;
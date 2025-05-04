import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import {registerValidation} from "./validations/auth.js";
import {postDataValidation} from "./validations/post.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import multer from 'multer';

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('DB is ok');
  })
  .catch((err) => {
    console.log('Error', err);
  })

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Images
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// Auth
app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

// Posts
app.post('/posts', checkAuth, postDataValidation, PostController.createPost);
app.get('/posts', PostController.getAllPosts);
app.get('/posts/:id', PostController.getOnePost);
app.patch('/posts/:id', checkAuth, postDataValidation, PostController.updatePost);
app.delete('/posts/:id', checkAuth, PostController.deletePost);


export const viteNodeApp = app;
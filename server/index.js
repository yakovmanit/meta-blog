import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import {registerValidation} from "./validations/auth.js";
import {postCreateValidation} from "./validations/post.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

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

// Auth
app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

// Posts
app.post('/posts', checkAuth, postCreateValidation, PostController.createPost);
// app.get('/posts', PostController.getAllPosts);
// app.get('/posts/:id', PostController.getOnePost);
// app.patch('/posts/:id', checkAuth, PostController.updatePost);
// app.delete('/posts/:id', checkAuth, PostController.deletePost);


export const viteNodeApp = app;
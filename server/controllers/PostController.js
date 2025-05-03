import PostModel from '../models/Post.js';
import {validationResult} from "express-validator";

export const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    })

    const post = await doc.save();

    res.json(post);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Post not created',
    })
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user", "fullName avatarUrl");

    res.json(posts);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Posts not received',
    });
  }
}

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      {
        $inc: { viewsCount: 1 }
      },
      {
        returnDocument: 'after'
      }
    ).populate("user", "fullName avatarUrl")

    if (!post) {
      return res.status(400).json({
        message: 'Post not found',
      });
    }

    res.json(post);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Post not received',
    });
  }
}

export const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    );

    res.json({
      message: 'Post updated successfully',
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Post not updated',
    });
  }
}
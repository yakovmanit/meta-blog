import {validationResult} from "express-validator";
import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '30d'
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Registration failed'
    });
  }

}

export const login =  async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'Wrong email or password'
      });
    }

    const isValidStatus = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if(!isValidStatus) {
      return res.status(404).json({
        message: 'Wrong email or password'
      });
    }

    const token = jwt.sign(
      {
        _id: user._id
      },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '30d'
      }
    )

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Auth failed'
    });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(500).json({
        message: 'User not found'
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Forbidden access'
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    await UserModel.updateOne(
      {
        _id: req.userId
      },
      {
        $set: {
          fullName: req.body.fullName,
          avatarUrl: req.body.avatarUrl,
          description: req.body.description,
        },
      },
      {
        upsert: true,
      }
    );

    res.json({
      message: 'User updated successfully',
    });

  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'User not updated',
    });
  }
}

export const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    res.json(user);

  } catch (err) {
    console.warn(err);
    res.status(500).json({
      message: 'Users not received'
    })
  }
}
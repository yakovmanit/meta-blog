import {body} from "express-validator";

export const loginValidation = [
  body('email', 'Wring email format').isEmail(),
  body('password', 'The password has to be at least 4 symbols').isLength({min: 4}),
]

export const registerValidation = [
  body('fullName', 'Write your name (only letters)').isLength({min: 2}),
  body('email', 'Wring email format').isEmail(),
  body('password', 'The password has to be at least 4 symbols').isLength({min: 4}),
  body('avatarUrl', 'Wrong avatar url').optional().isURL(),
];
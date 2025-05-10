import {body} from "express-validator";

export const postDataValidation = [
  body('title', 'Enter post title').isLength({min: 3}).isString(),
  body('text', 'Enter post text').isLength({min: 3}).isString(),
  body('tags', 'Enter tags with comma').optional().isArray(),
  body('imageUrl', 'Wrong avatar url').optional().isString(),
];
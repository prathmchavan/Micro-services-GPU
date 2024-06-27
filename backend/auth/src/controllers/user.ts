import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError, RequestValidationError } from "../middlewares/error-handler";

export const signup = [
  body('email')
    .isEmail()
    .withMessage("Enter a valid email"),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }

      const { email, password } = req.body;

      if (!email || typeof email !== 'string') {
        return next(new Error('Provide a valid email'));
      }

      
      console.log(`Creating user with email: ${email} and password: ${password}`);

      res.status(201).send("User created successfully");

          return next(new DatabaseConnectionError());

    } catch (error) {
      next(error);
       }
  }
];

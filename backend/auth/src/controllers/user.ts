import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';

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
          return res.status(400).json({ errors: errors.array() });
        }
    
        const { email, password } = req.body;
    
        if (!email || typeof email !== 'string') {
          return res.status(400).send("Provide a valid email");
        }
    
        
    
        res.status(201).send("User created successfully");
    } catch (error) {
     next(error)   
    }
  }
];

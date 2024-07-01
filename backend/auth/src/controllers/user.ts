import { Request, Response, NextFunction } from "express";
import { body, validationResult } from 'express-validator';
import {  BadRequestError, RequestValidationError } from "../middlewares/error-handler";
import { User } from "../models/User";
import { hashPassword } from "../services/passwordSrv";
import jwt from "jsonwebtoken"



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

      const {email , password } = req.body

      const existingUser = await User.findOne({email});

      const hashedpass = await hashPassword(password);

      if(existingUser){
        return next( new BadRequestError("Email already exist"))
      }

      const user = new User ({email,  password : hashedpass});

      await user.save();

      //generate jwt

        const userjwt = jwt.sign({
          id:user.id,
          email: user.email 
        }, process.env.jwt!)

        req.session={
          jwt: userjwt
        }
      //store it on session object


      res.status(200).send(user)

    } catch (error) {
      next(error);
       }  
  }
];

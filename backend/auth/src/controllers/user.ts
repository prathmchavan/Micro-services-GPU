import { Request, Response, NextFunction } from "express";
import { body,  } from 'express-validator';
import {  BadRequestError } from "../middlewares/error-handler";
import { User } from "../models/User";
import { comparePasswords, hashPassword } from "../services/passwordSrv";
import jwt from "jsonwebtoken"
import { CurrentUserMid } from "../middlewares/current-user";



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


      res.status(201).send(user)

    } catch (error) {
      next(error);
       }  
  }
];



export const signin = [
  body('email')
    .isEmail()
    .withMessage("Enter a valid email"),

  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
    

      const {email , password } = req.body

      const existingUser = await User.findOne({email});

      if(!existingUser){
        return next( new BadRequestError("Invalid credential "))
      }

      const isMatch = await existingUser.comparePassword(password);

      if (!isMatch) {
        return res.status(400).send({ error: "Wrong Password" });
      }
      

       //generate jwt

       const userjwt = jwt.sign({
        id:existingUser.id,
        email: existingUser.email 
      }, process.env.jwt!)

      req.session={
        jwt: userjwt
      }
    //store it on session object


    res.status(200).send(existingUser)

    } catch (error) {
      next(error);
       }  
  }
];


export const currentUser = (req: Request , res:Response , next: NextFunction) =>{

  res.send({ currentUser: req.currentUser || null });
}


export const signout =(req:Request , res: Response, next: NextFunction)=>{

  try {
    
    req.session = null;

    res.send({ messgae  : " signed out successfull"})
  } catch ( error) {

    next(error);
  }
}
import { Request, Response, NextFunction } from "express";
import { body,  } from 'express-validator';
import {  BadRequestError } from "@microproj/proj";
import { User } from "../models/User";
import { comparePasswords, hashPassword } from "../services/passwordSrv";
import jwt from "jsonwebtoken"
import { CurrentUserMid } from "@microproj/proj";




export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new BadRequestError("Email already exists"));
    }

    const hashedPass = await hashPassword(password);
    const user = new User({ email, password: hashedPass });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.jwt!);

    req.session = {
      jwt: userJwt
    };

    // Store it on session object
    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};


export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return next(new BadRequestError("Invalid credentials"));
    }

    const isMatch = await comparePasswords(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    // Store it on session object
    res.status(200).json({ user: existingUser, token: userJwt });
  } catch (error) {
    next(error);
  }
};



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
import mongoose from "mongoose";
import { NextFunction } from "express";
import dotenv from 'dotenv'

dotenv.config();

 const connectDb = async () => {
    try {   
        if(!process.env.jwt)
        {
            throw new Error("jwt key must be defined");
        }

        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("auth service datbase is connected ")

    } catch (error) {

        
        console.log("error connecting db")
        // throw new Error
    }
}

export default connectDb;
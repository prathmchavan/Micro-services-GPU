import mongoose from "mongoose";
import { NextFunction } from "express";

 const connectDb = async () => {
    try {

        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("auth service datbase is connected ")

    } catch (error) {

        
        console.log("error connecting db")
        throw new Error
    }
}

export default connectDb;
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
        if(!process.env.URI)
            {
                throw new Error("Database uri must be defined");
            }

        await mongoose.connect(process.env.URI);
        console.log("Tickets service datbase is connected ")

    } catch (error) {

        
        console.log("error connecting db")
        // throw new Error
    }
}

export default connectDb;
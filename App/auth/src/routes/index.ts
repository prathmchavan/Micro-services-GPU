import express, { Router, Request , Response ,NextFunction } from 'express'
import { userRouter } from './user';

const router = Router();

router.get("/",(req: Request , res:Response , next : NextFunction)=>{
    try {
        res.send("Live")
    } catch (error) {
        next(error)
    }
})

router.use("/user",userRouter);

export default router;
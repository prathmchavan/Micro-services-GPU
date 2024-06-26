import express, { Router , NextFunction , Request , Response} from 'express'
import { signup } from '../controllers/user';

const router = Router();

// router.get("/currentuser",);

// router.post("signin",signin);

// router.post("/signout",signout);

router.post("/signup",signup);

export {router as userRouter}
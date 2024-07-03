import { Router } from 'express';
import { currentUser, signin, signout, signup } from '../controllers/user';
import { body } from 'express-validator';
import { CurrentUserMid, requireAuth, validationRequest } from '@microproj/proj';


const router = Router();

router.get("/currentuser", CurrentUserMid, requireAuth, currentUser);

router.post("/signin",
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validationRequest,
  signin
);

router.post("/signout", signout);

router.post("/signup",
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  validationRequest,
  signup
);

export { router as userRouter };

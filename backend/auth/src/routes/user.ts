import { Router , NextFunction , Request , Response} from 'express'
import { currentUser, signin, signout, signup } from '../controllers/user';
import { validationRequest } from '../middlewares/validate-request';
import { CurrentUserMid } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = Router();

router.get("/currentuser",CurrentUserMid, requireAuth ,currentUser);

router.post("/signin",validationRequest, signin);

router.post("/signout",signout);

router.post("/signup", validationRequest ,signup);

export {router as userRouter}
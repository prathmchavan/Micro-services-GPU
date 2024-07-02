import jwt from 'jsonwebtoken'
import  { Response , Request , NextFunction } from 'express'


interface UserPayload{
    id: string;
    email: string;
}
declare global {
    namespace Express{
        interface Request{
            currentUser?: UserPayload;
        }
    }
}


export const CurrentUserMid = ( req: Request , res: Response , next : NextFunction)=>{

    if(!req.session?.jwt){
        return next()
    }
    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.jwt!
        ) as UserPayload

        req.currentUser = payload;
    } catch (error) {
        next();
    }
    next();

}


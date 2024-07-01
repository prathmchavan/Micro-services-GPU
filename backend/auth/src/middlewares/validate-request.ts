import { NextFunction  , Request , Response} from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "./error-handler";



export const validationRequest= (
    req: Request , res: Response , next : NextFunction
) =>{

    
const errors = validationResult(req);
      
if (!errors.isEmpty()) {
  return next(new RequestValidationError(errors.array()));
}

next ();
}

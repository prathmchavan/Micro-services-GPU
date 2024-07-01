import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'express-validator';
import { CustomError } from '../errors/customError';



export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    console.log("something went wrong ", err);

    if(err instanceof CustomError) {
      
        return res.status(err.statusCode).send({errors: err.serializeErrors()}); 
    }

    res.status(400).send({ message: err.message });
}


export class RequestValidationError extends CustomError {
    statusCode = 400;
  
    constructor(public errors: ValidationError[]) {
      super('Invalid request parameters');
  
      // Only because we are extending a built-in class
      Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    
  
    serializeErrors() {
      return this.errors.map((error) => {
     
        return { message: error.msg, path: error.type  };
      });
    }
  }



export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'error connecting to database'
    constructor() {
        super("database error ");

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors()
    {
        return [
            {message : this.reason}
        ]
    }
}


export class BadRequestError extends CustomError{
    
    statusCode: number = 400;

    constructor( public message : string)
    {
        super(message)

        Object.setPrototypeOf(this, BadRequestError.prototype);

    }
    
    serializeErrors() {

        return [{message: this.message}]
    }

    
}




export class NotAuthorizedError  extends CustomError{
    statusCode: number = 401;

    constructor()
    {
        super('not authorized');
        Object.setPrototypeOf(this , NotAuthorizedError.prototype)
    }
    serializeErrors() {
        
        return [{message:'not authorized'}];
    }
}



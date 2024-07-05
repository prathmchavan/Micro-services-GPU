import { Router } from "express";
import { createTicket, getAll, getById, updateRequest } from "../controllers/tickets";
import { requireAuth, validationRequest } from "@microproj/proj";
import { body, ExpressValidator } from "express-validator";

const router = Router();


//route for ticket  creation
router.post('/createtkt', [
    body('title').isEmail().withMessage('Title is required'),
    body('price').isFloat({gt:0}).withMessage("Price must be greater than 0"),
  ],requireAuth , validationRequest,createTicket);

//route for getting the tickets

router.get('/',getAll);
router.get('/:id', getById);

//update the ticket

router.put('/:id', [
  body('title').isEmail().withMessage('Title is required'),
  body('price').isFloat({gt:0}).withMessage("Price must be greater than 0"),
],requireAuth,validationRequest, updateRequest);
export {router as ticketsRouter} ;

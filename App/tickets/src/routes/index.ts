import { Router } from "express";
import { ticketsRouter } from "./tickets";


const router = Router();

router.get('/', (req ,res)=>{
    res.status(200).send("tickets working")
})

router.use('/tickets', ticketsRouter);


export default router;
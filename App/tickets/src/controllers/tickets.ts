import { NextFunction, Request, Response } from "express";
import { Tickets } from "../models/Tickets";


export const createTicket = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { title, price } = req.body

        const ticket = new Tickets({ title, price, userId: req.currentUser!.id });

        await ticket.save();

        res.send(201).send(ticket)

    } catch (error) {

    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
      const tickets = await Tickets.find();
      res.status(200).send(tickets);
    } catch (err) {
      res.status(500).send({ error: 'Failed to fetch tickets' });
    }
  };

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket = await Tickets.findById(req.params.id);
        if (!ticket) {
            res.status(404).send("Ticket not Found")
        }
        res.send(ticket);
    } catch (error) {

    }
}


export const updateRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket = await Tickets.findById(req.params.id);

        if(!ticket){
            res.status(404).send("Ticket you want to update not found")
        }
        
        if(ticket?.userId !== req.currentUser!.id){
            res.status(401).send("User not logedin")

        }

        ticket!.set({
            title : req.body.title,
            price : req.body.price
        })
        await ticket?.save();

        res.send(ticket);
        
    } catch (error) {

    }

}
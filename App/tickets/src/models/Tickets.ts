import mongoose, { Document, Schema  ,Model} from "mongoose";


interface ITicket extends Document {
    title: string;
    price: number;
    userId: string;
}


const ticketSchema: Schema<ITicket> = new Schema({

    title: {
        type: String,
        required: true,

    },
    price:
    {
        type: Number,
        required: true,

    },
    userId: {
        type: String,
        required: true,

    }},{
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    
});

const Tickets: Model<ITicket> = mongoose.model<ITicket>('User', ticketSchema);

export { Tickets };

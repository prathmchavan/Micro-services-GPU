import express, { Application , Response , Request, Router} from "express"
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";

let app : Application = express();
let port : number = 8000
app.use("/",router);
app.use(errorHandler);



app.listen(port, ()=>{
    console.log(`server is live on ${port}`)
})


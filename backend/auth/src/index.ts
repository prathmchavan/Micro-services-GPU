import express, { Application , Response , Request, Router} from "express"
import router from "./routes";

let app : Application = express();
let port : number = 8000
app.use("/",router);



app.listen(port, ()=>{
    console.log(`server is live on ${port}`)
})


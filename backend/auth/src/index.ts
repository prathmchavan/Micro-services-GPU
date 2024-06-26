import express, { Application , Response , Request} from "express"

let app : Application = express();

app.get("/api/user/currentuser",(req: Request, res:Response)=>{
    res.send("hello")
})


console.log("111111")
app.listen(3000, ()=>{
    console.log("server is running on port 3000 ")
})


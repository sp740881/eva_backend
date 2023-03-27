const express=require("express")
const { connection } = require("./db")
require('dotenv').config()
const {validation}=require("./middleware/user.middleware")
const { PostRoute } = require("./Routes/post.route")
const { userRoute } = require("./Routes/user.router")
const app=express()
app.use(express.json())

app.use("/user",userRoute)
 app.use(validation)
app.use("/posts",PostRoute)

const port=process.env.PORT||8080
app.listen(port,async()=>{
    try {
        await connection
        console.log("connected to Mongo Atlas")
    } catch (error) {
        console.log(error)
    }
})
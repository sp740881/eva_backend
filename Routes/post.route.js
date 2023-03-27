
const express=require("express")
const { PostModel } = require("../model/post.model")
const PostRoute=express.Router()
PostRoute.post("/add",async(req,res)=>{
    try {
        const postData=new PostModel(req.body)
        await postData.save()
        res.status(200).send({"msg":"data added succefullt"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})
//***************************************** */
PostRoute.get("/",async(req,res)=>{
    const {userId}=req.body
      let query= req.query;
      query.userId=userId;
      if(query.device1){
        query.$or=[{device:query.device1}]
      }
      if(query.device2){
        query.$or.push({device:query.device2})
      }
      delete query.device1
      delete query.device2
    //   console.log(userId)
      const post=await PostModel.find({...query})
      res.send(post)
    })
PostRoute.get("/top",async(req,res)=>{
    const userId=req.body.userId;
    try {
       const postData=await PostModel.find({userId}).sort({"no_of_comments":-1}).limit(2)
       res.status(200).send(postData)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
///******************************************************** */
PostRoute.delete("/delete/:id",async(req,res)=>{
    const userId=req.body.userId;
    const postId=req.params.id;
    try {
       await PostModel.findByIdAndDelete({userId:userId,_id:postId})
       res.status(200).send({"msg":"data deleted succefullt"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

PostRoute.patch("/update/:id",async(req,res)=>{
    const userId=req.body.userId;
    const postId=req.params.id;
    try {
       await PostModel.findByIdAndUpdate({userId:userId,_id:postId},{$set:req.body})
       res.status(200).send({"msg":"data updated succefullt"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports={PostRoute}


// {
//     "name":"shivam",
//     "email":"shiv@gamil.com",
//     "gender":"male",
//     "password":"shivam123",
//     "age":22,
//     "city":"Basti",
//     "is_married":false
// }
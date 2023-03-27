const jwt = require('jsonwebtoken')
const validation=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    console.log(token)
try {
    jwt.verify(token,'shivam', (err, code)=> {
       if(code){
        req.body.userId=code.userId;
        next()
       }else{
        res.status(400).send({"msg":"You Are Not Authorised"})
       }
      });
} catch (error) {
    res.status(400).send(error.message)
}
}
module.exports={validation}
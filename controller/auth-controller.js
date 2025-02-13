const prisma = require("../models");
const bcrypt = require('bcryptjs')
const createError = require("../utils/createError")
const jwt =require('jsonwebtoken');
const tryCatch = require("../utils/tryCatch");

function checkEmailorMobile(identity){
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const mobileRegex=/^[0-9]{10,15}$/

 let identityKey=""
 if(emailRegex.test(identity)){
    identityKey = 'email'
 }
 if(mobileRegex.test(identity)){
    identityKey = 'mobile'
 }
 if(!identityKey){
    createError(400,'only Email or Mobile phone')
 }
 return identityKey
}

module.exports.register =async(req,resp,next)=>{
try {
    const { identity, firstname, lastname, password, confirmPassword }=req.body
    //validation
    if(!identity.trim() || !firstname.trim() || !lastname.trim() || !password.trim() || !confirmPassword.trim()){
        return createError(400,'Plese fill all data')
    }
    if(password !== confirmPassword){
        return createError(400,'Plese check confirm-password')
    }
   //identity เป็นemail หรือ mobile
  const identityKey =checkEmailorMobile(identity)

    //หาว่ามี userนี้แล้วหรือยัง
    const findIdentity =await prisma.user.findUnique({
        where:{[identityKey]:identity}
    })
    if(findIdentity){
        createError(409,`Already have this user :${identity}`)
    }

    const newUser ={
        [identityKey]:identity ,
        password:await bcrypt.hash(password,10) ,
        firstname:firstname ,
        lastname:lastname
    }
    console.log(newUser);
    const result =await prisma.user.create({data:newUser})
    console.log(result);

    resp.json({msg:`Register success`,result})
} catch (err) {
    next(err)
}
}


//-------------------------------------------------------------
module.exports.login =tryCatch(async(req,resp,next)=>{
        
        const {identity,password}=req.body 
        //validation
        if(!identity.trim() || !password.trim()){
            createError(400,"please fill all data")
        }
        //identity เป็นemail หรือ mobile
      const identityKey =checkEmailorMobile(identity)
    
      //find user
      const foundUser =await prisma.user.findUnique({
        where:{[identityKey]:identity}
      })
      if(!foundUser){
        createError(401,'Invalid Login')
      }
      //check password
      let pwOk =await bcrypt.compare(password,foundUser.password)
      if(!pwOk){
        createError(401,'Invalid Login')
      }
      //create jwt token
      const payload = {id: foundUser.id}
      const token= jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"30d"
      })
    
    resp.json({msg:'Login success',token:token,user:foundUser})
   
    })

//------------------------------------------------------------------------------
module.exports.getMe =(req,resp)=>{
    resp.json({msg:'Getme...'})
}
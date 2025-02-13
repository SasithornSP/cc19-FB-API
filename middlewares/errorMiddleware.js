module.exports=(err,req,resp,next)=>{
    console.log(err);
    resp.status(500).json({error:err.message})
}
module.exports=(err,req,resp,next)=>{
    console.log(err);
    const statusCode =err.statusCode || 500
    resp.status(statusCode).json({error:err.message})
}
module.exports=(req,resp)=>{
    resp.status(400).json({msg:'Service not found'})
}
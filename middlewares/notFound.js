module.exports=(req,resp)=>{
    resp.status(404).json({msg:'Service not found'})
}
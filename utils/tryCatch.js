// module.exports =(func)=>{
//     return (req,resp,next)=>func(req,resp,next).catch(err=>next(err))
// }

module.exports=func=>(req,resp,next)=>func(req,resp,next).catch(next)
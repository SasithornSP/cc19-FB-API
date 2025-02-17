// module.exports =(func)=>{
//     return (req,resp,next)=>func(req,resp,next).catch(err=>next(err))
// }

// module.exports=func=>(req,resp,next)=>func(req,resp,next).catch(next)

module.exports = func  => {
    return async function (req, res, next) {
      try {
        await func(req, res, next)
      }catch(err) {
        next(err)
      }
    }
  }
  
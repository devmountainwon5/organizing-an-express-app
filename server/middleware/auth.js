module.exports = {
    authMiddleware:(req,res,next)=> {
        if(req.sesssion.user){
            next()
        }else{
            res.send({success:false, message:'login'})
        }
    }
}
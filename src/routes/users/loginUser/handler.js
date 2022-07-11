const loginHandler =async (req,res) =>{
    const userLogin = await res.locals.UserServices.login(req.body);
    return res.send(userLogin)
}

module.exports= loginHandler;

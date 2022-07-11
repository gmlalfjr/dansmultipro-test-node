const refreshTokenHandler =async (req,res) =>{
    const refreshToken = await res.locals.UserServices.refreshToken(req.body);
    return res.send(refreshToken)
}

module.exports= refreshTokenHandler;

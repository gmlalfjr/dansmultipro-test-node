const createUserHandler =async (req,res) =>{
    const createUser = await res.locals.UserServices.createUser(req.body);
    return res.send(createUser)
}

module.exports= createUserHandler;

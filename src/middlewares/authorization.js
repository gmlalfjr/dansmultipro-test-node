const jwt = require("jsonwebtoken");
const CustomError = require("../utils/errorResponse");

const authorization = (req,res,next)=>{
    try {
        const token = req.headers["authorization"];
        if (!token) {
            throw new CustomError("No token", 403, "FORBIDDEN")
        }
        
        if (typeof token !== "undefined") {
            const bearer = token.split(" ");
            if (bearer == null) return res.sendStatus(401);
            const bearerToken = bearer[1];``
            const decoded = jwt.verify(bearerToken, process.env.SECRET_ACCESS_TOKEN)
            req.user = decoded;
            next();
        }
    } catch (e) {
         return next(res.send(e))

    }
}


module.exports = {authorization};

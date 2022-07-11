const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {errorCodes,errorMessages,errors} = require('.././utils/errors');
const CustomError = require('.././utils/errorResponse');
const { SuccessResponse } = require('../utils/successResponse');
class UserServices {
     constructor(opts) {
        Object.assign(this, opts);
    }

    async createUser(payload) {
        try {
            const findUser = await this.userRepositories.findOne(payload.username);
            if (findUser){
                throw new CustomError(errorMessages.USER_EXIST, errorCodes.DB_ERROR, 400);
            }

            const hashedPassword = await this.hashPassowd(payload.password)    
            const insertPayload = {
                password:hashedPassword,
                username:payload.username,
            }
            
            const result = await this.userRepositories.create(insertPayload)

            return SuccessResponse(
                "Sucess create user",
                result,
                200
            )
        } catch (e) {
            throw e
        }
    }

    async hashPassowd(password) {
        const saltRounds = 10;
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        });
        return hashedPassword
    }

    async login(payload) {
        try{
            const findUser = await this.userRepositories.findOne(payload.username);
            if (!findUser){
                throw new CustomError("username / password salah", errorCodes.BAD_REQUEST_ERROR, 400);
            }
            const compare = await bcrypt.compare(payload.password, findUser.password);
            if (!compare){
                throw new CustomError("username / password salah", errorCodes.DB_ERROR, 400);
            }
            const generateTokenUser = this.generateToken({id:findUser.id, username: findUser.username}, process.env.SECRET_ACCESS_TOKEN, "15m");
            const generateRefreshTokenUser = this.generateToken({id:findUser.id}, process.env.SECRET_REFRESH_TOKEN, "50m");
            return SuccessResponse(
                "Sucess Login",
                {
                    accessToken: generateTokenUser,
                    refreshToken: generateRefreshTokenUser
                },
                200
            )
        }catch (e) {
            throw e
        }
    }

    generateToken(user, key, expiresIn) {
        return jwt.sign(user, key, { expiresIn: expiresIn });
    }

    async refreshToken(payload){
        const { refreshToken } = payload;
        let user
        try {
            user = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
        } catch (error) {
            throw new Error("Invalid refresh token")
        }

        const accessToken = this.generateToken({ id:user.id, username: user.username}, process.env.SECRET_ACCESS_TOKEN, "15m");

        const generateRefreshTokenUser = this.generateToken({ id:user.id, username: user.username }, process.env.SECRET_REFRESH_TOKEN, "50m");
        return SuccessResponse(
            "Sucess Generate Token",
            {
                accessToken: accessToken,
                refreshToken: generateRefreshTokenUser
            },
            200
        )
    }

}

module.exports = UserServices
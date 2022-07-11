const {UserSchema} = require('../models')
const User =  UserSchema;

class UserRepositories {
    async findAll () {
        const result = await User.find();
        return result
    }

    async create(payload){
        const result = await User.create(payload);
        return result;
    }


    async findOne(filter){
        const result = await User.findOne({username:filter});
        return result;
    }


}

module.exports = UserRepositories
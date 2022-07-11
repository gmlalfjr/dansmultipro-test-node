const {
    UserServices,
    JobServices
} = require('../services/index')
const { UserRepositories } = require('../repositories/index')

const userRepositories = new UserRepositories();

const services = (req, res, next) => {

    res.locals.UserServices =  new UserServices({
        userRepositories
    });

    res.locals.JobServices =  new JobServices();
    return next();
};

module.exports = services

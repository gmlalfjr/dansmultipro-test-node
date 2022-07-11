require('dotenv').config()
const routes = require('./routes')
const Util = require('./utils/util')
const mongoose  = require('mongoose')
const services = require('./middlewares/index')
const port = process.env.PROCCESS ||5000;

const dbInitialization = async (app) => {
    Object.assign(app.locals, {
        mongo: await mongoose.connect(process.env.DB_INSTANCES,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    });
};

const initializations = [
    dbInitialization
];


const ms = new Util({
    port,
    services,
    initializations,
    routes,
})

ms.listen();
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const services = require('../middlewares/services');
const morgan = require('morgan')
class Util {
   constructor(opts) {
       Object.assign(this, opts);
       this.app = express();
       this.app.use(bodyParser.json())
       this.app.use(morgan('tiny'))
       this.app.use(services)
       
       if (this.routes && this.routes.length) {
           this.routes.forEach(route => this.app.use(route));
        }
        if (this.middlewares && this.middlewares.pre && this.middlewares.pre.length) {
           this.middlewares.pre.forEach(middleware => this.app.use(middleware));
        }

       if (this.middlewares && this.middlewares.post && this.middlewares.post.length) {
           this.middlewares.post.forEach(middleware => this.app.use(middleware));
       }
   }
    async listen() {
        if (this.initializations && this.initializations.length) {
            try {
                await this.initializations.reduce((p, fn) => p.then(() => fn(this.app)), Promise.resolve());
            } catch (error) {

                throw error;
            }
        }

        return new Promise((resolve) => {
            this.app.listen(process.env.SERVICE_PORT, () => {
                console.log(`server runnnig on port ${process.env.SERVICE_PORT}`)
                return resolve();
            });
        });
    }

}

module.exports = Util

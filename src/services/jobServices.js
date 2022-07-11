const { SuccessResponse } = require('../utils/successResponse');
const axios = require('axios').default


class JobServices {
     constructor(opts) {
        Object.assign(this, opts);
    }

    async jobList(params) {
        const { description, location, page} = params
        try {
            let api = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?`
            if (description) {
                api = api + `description=${description}&`
            }
            if (location) {
                api = api + `location=${location}&`
            }

            if (page) {
                api = api + `page=${page}`
            }

            const jobs = await axios.get(api)
            return SuccessResponse(
                "Success Get Jobs List",
                jobs.data,
                200
            )
        } catch (e) {
            throw e 
        }
    }


    async jobDetail(params) {
        const { id } = params
        let api = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
        const jobs = await axios.get(api)
            return SuccessResponse(
                "Success Get position detail",
                jobs.data,
                200
            )
    }

}

module.exports = JobServices
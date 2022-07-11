const listJobHandler =async (req,res) =>{
    const jobList = await res.locals.JobServices.jobList(req.query);
    return res.send(jobList)
}

module.exports= listJobHandler;

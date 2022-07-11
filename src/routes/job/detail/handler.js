const detailPositionHandler =async (req,res) =>{
    const jobDetail = await res.locals.JobServices.jobDetail(req.params);
    return res.send(jobDetail)
}

module.exports= detailPositionHandler;

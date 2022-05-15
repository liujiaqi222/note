const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// 只展示当前用户的创建的工作
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, length: jobs.length })

}
const getJob = async (req, res) => {
  res.send('getJob');
}
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log(req.body);
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job)
}
const updateJob = async (req, res) => {


}
const deleteJob = async (req, res) => {
  res.send('delete job');
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
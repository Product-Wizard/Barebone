
import asyncHandeler from "express-async-handler";
import Job from "../models/job.model.js";
import JobValidators from "../validators/job.validators.js";
import { Op } from "sequelize";

const getJobs = asyncHandeler(async (req, res, next) => {
  const { type, page: stringPage, perPage: stringPerPage, ...othersQueryParams } = req.query
  const page = parseInt(stringPage as string || "1");
  const perPage = parseInt(stringPerPage as string || "50");
  const otherQueryKeys = Object.keys(othersQueryParams);
  const orQueryKeys: any[] | undefined = otherQueryKeys.length === 0 ? undefined :
    otherQueryKeys.map((key) => ({ [ key ]: { [ Op.like ]: `%${othersQueryParams[ key as any ]}%` } }));

  let whereQuery: any = {};
  if (orQueryKeys) whereQuery = { ...whereQuery, [ Op.or ]: [ ...orQueryKeys ] };
  if (type) whereQuery.type = type;
  const jobs = await Job.findAll({
    limit: perPage,
    order: [ [ "createdAt", "desc" ] ],
    offset: page > 1 ? (page - 1) * perPage : 0,
    where: whereQuery,
  });

  const totalJobs = await Job.count({
    where: whereQuery,
  });
  const pagesCount = Math.ceil(totalJobs / perPage)
  res.status(200).json({
    error: false,
    data: jobs,
    message: `jobs on page ${page}`,
    pagination: {
      nextPage: page < pagesCount ? page + 1 : page,
      previousPage: page > 1 ? page - 1 : 0,
      totalPages: pagesCount
    }
  })
});

const createJob = asyncHandeler(async (req, res, next) => {
  const { value, error } = JobValidators.createJobValidator.validate(req.body);
  if (error) {
    res.status(400).json({
      error: true,
      data: null,
      message: error.details[ 0 ].message.replaceAll("_", " ")
        .replaceAll("[", " ")
        .replaceAll("]", " "),
    });
    return;
  }
  const job = await Job.create(value);
  res.status(200).json({
    error: false,
    data: job.getJobData(),
    message: "job listing created"
  });
})

/**
 * delete job listing by id

*/
const deleteJob = asyncHandeler(async (req, res, next) => {
  const job = await Job.findOne({ where: { id: req.params.id } });
  if (!job) {
    res.status(404).json({ error: true, message: "job dosen't exist", data: null });
    return;
  }
  await job.destroy();
  res.status(200).json({
    error: false,
    data: null,
    message: "job listing delete"
  });
})
/**
  *update job listing by id
 */

const updateJob = asyncHandeler(async (req, res, next) => {
  const { value, error } = JobValidators.updateJobValidator.validate(req.body);
  if (error) {
    res.status(400).json({
      error: true,
      data: null,
      message: error.details[ 0 ].message.replaceAll("_", " ")
        .replaceAll("[", " ")
        .replaceAll("]", " "),
    });
    return;
  }
  const job = await Job.findOne({ where: { id: req.params.id } });
  if (!job) {
    res.status(404).json({ error: true, message: "job dosen't exist", data: null });
    return;
  }
  await job.update(value);
  res.status(200).json({
    error: false,
    data: job.getJobData(),
    message: "job listing updated"
  });
})




const JobController = {
  createJob,
  deleteJob,
  updateJob,
  getJobs
}

export default JobController;
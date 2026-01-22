
import asyncHandeler from "express-async-handler";
import JobApplication from "../models/jobApplication.model.js";
import JobApplicationValidators from "../validators/jobApplication.validators.js";
import { Op } from "sequelize";
import Job from "../models/job.model.js";

const getJobApplications = asyncHandeler(async (req, res, next) => {
  const { type, page: stringPage, perPage: stringPerPage, ...othersQueryParams } = req.query
  const page = parseInt(stringPage as string || "1");
  const perPage = parseInt(stringPerPage as string || "50");
  const otherQueryKeys = Object.keys(othersQueryParams);
  const orQueryKeys: any[] | undefined = otherQueryKeys.length === 0 ? undefined :
    otherQueryKeys.map((key) => ({ [ key ]: { [ Op.like ]: `%${othersQueryParams[ key as any ]}%` } }));

  let whereQuery: any = {};
  if (orQueryKeys) whereQuery = { ...whereQuery, [ Op.or ]: [ ...orQueryKeys ] };
  if (type) whereQuery.type = type;
  const jobApplications = await JobApplication.findAll({
    limit: perPage,
    order: [ [ "createdAt", "desc" ] ],
    offset: page > 1 ? (page - 1) * perPage : 0,
    where: whereQuery,
    include: [
      {
        model: Job,
        as: "job", // Must match the 'as' defined in your associations
        attributes: [ "title", "company", "type", "category" ] // Only get the fields you need
      }
    ],
    subQuery: false
  });

  const totalJobApplications = await JobApplication.count({
    where: whereQuery,
  });
  const pagesCount = Math.ceil(totalJobApplications / perPage)
  res.status(200).json({
    error: false,
    data: jobApplications,
    message: `job applications on page ${page}`,
    pagination: {
      nextPage: page < pagesCount ? page + 1 : page,
      previousPage: page > 1 ? page - 1 : 0,
      totalPages: pagesCount
    }
  })
});

const createJobApplication = asyncHandeler(async (req, res, next) => {
  const { value, error } = JobApplicationValidators.createJobApplicationValidator.validate(req.body);
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
  const existingApplication = await JobApplication.findOne({ where: { job_id: value.job_id, email: value.email } });
  if (existingApplication) {
    res.status(200).json({
      error: false,
      message: "you have previously applied for this job"
    });
    return;
  }
  const jobApplication = await JobApplication.create(value);
  res.status(200).json({
    error: false,
    data: jobApplication.getJobApplicationData(),
    message: "job application submitted succesfully"
  });
})

/**
 * delete jobApplication listing by id

*/
const deleteJobApplication = asyncHandeler(async (req, res, next) => {
  const jobApplication = await JobApplication.findOne({ where: { id: req.params.id } });
  if (!jobApplication) {
    res.status(404).json({ error: true, message: "job application dosen't exist", data: null });
    return;
  }
  await jobApplication.destroy();
  res.status(200).json({
    error: false,
    data: null,
    message: "job application delete"
  });
})





const JobApplicationController = {
  createJobApplication,
  deleteJobApplication,
  getJobApplications
}

export default JobApplicationController;
import Job from "./job.model.js";
import JobApplication from "./jobApplication.model.js";

const databaseAssociations = () => {
  Job.hasMany(JobApplication, {
    as: "applications",
    foreignKey: "job_id",
    onDelete: "CASCADE"
  });

  JobApplication.belongsTo(Job, {
    as: "job",
    foreignKey: "id"
  });
};



export default databaseAssociations;
import { DataTypes, Model, } from "sequelize";
import sequelize from "../config/db.config.js";
import JobApplication from "./jobApplication.model.js";
export type JobType = 'remote' | 'on-site' | 'hybrid';
export type CategoryType = "stem " | "humanities_and_art" | "commercial_and_finance" | "non_Profit";
// export type CategoryType = "marketing" | "tech" | "admin" | "research" | "finance" | "design";
export type JobTrainigScope = "siwes_or_general" | "graduate_training" | "international" | "";

export interface JobModelInterface {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: CategoryType;
  link: string;
  job_training_scope: string;
  // organization_id: number;
  description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
export type CreateJobType = Omit<JobModelInterface, "id">

class Job extends Model<Omit<JobModelInterface, "createdAt" | "updatedAt">, CreateJobType> {
  getJobData() {
    const data = this.dataValues;
    return data;
  }
}

Job.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_training_scope: {
    type: DataTypes.STRING,
    defaultValue: null,
    allowNull: true,
  }

}, {
  sequelize: sequelize,
  modelName: "job",
});


export default Job;
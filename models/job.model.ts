import { DataTypes, Model, } from "sequelize";
import sequelize from "../config/db.config";

export type JobType = 'remote' | 'on-site' | 'hybrid';
export type CategoryType = "marketing" | "tech" | "admin" | "research" | "finance" | "design";
export interface JobModelInterface {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: string;
  organization_id: number;
  postedDate: string;
  description: string;
}
export type CreateJobType = Omit<JobModelInterface, "id" | "postedDate">

class Job extends Model<JobModelInterface, CreateJobType> {
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
  organization_id: {
    type: DataTypes.INTEGER,
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
  postedDate: {
    type: DataTypes.STRING,
  },

}, {
  sequelize: sequelize,
  modelName: "Job",
});

export default Job;
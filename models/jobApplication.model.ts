import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config.js";
import Job from "./job.model.js";

export interface JobApplicationModelInterface {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  job_id: string;
}

export type CreateJobApplicationType = Omit<JobApplicationModelInterface, "id">

class JobApplication extends Model<JobApplicationModelInterface, CreateJobApplicationType> {
  getJobApplicationData() {
    const data = this.dataValues;
    return data;
  }
}

JobApplication.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
},
  {
    sequelize: sequelize,
    modelName: "job_application",
  });


export default JobApplication;
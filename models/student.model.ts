import { DataTypes, Model, } from "sequelize";

import sequelize from "../config/db.config.js";

export type year_of_study = "fresh_man" | "sophomore" | "junior" | "senior";
export interface StudentModelInterface {
  id: number;
  email: string;
  full_name: string;
  year_of_study: year_of_study;
  course_of_study: string;
  password?: string;
  defaultPassword: boolean;
}

export type CreateStudentType = Omit<StudentModelInterface, "id" | "defaultPassword" | "password">

class Student extends Model<StudentModelInterface, CreateStudentType> {
  getStudentData() {
    const data = this.dataValues;
    delete data.password;
    return data;
  }
}

Student.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_of_study: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  defaultPassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true
  },
  year_of_study: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: sequelize,
  modelName: "student",
});

export default Student;
import { DataTypes, Model, } from "sequelize";
import sequelize from "../config/db.config.js";

type CategoryType = "career_advice" | "industry_trends" | "resume_tips" | "student_stories"
export interface ResourceModelInterface {
  id: number;
  title: string;
  category: CategoryType;
  author: string;
  imageUrl: string;
  summary: string;
  body: string;
}

export type CreateResourceType = Omit<ResourceModelInterface, "id">

class Resource extends Model<ResourceModelInterface, CreateResourceType> {
  getResourceData() {
    const data = this.dataValues;
    return data;
  }
}

Resource.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: sequelize,
  modelName: "resource",
});

export default Resource;
import { DataTypes, json, Model, ModelAttributes } from "sequelize";

import sequelize from "../config/db.config";

export interface AdminModelInterface {
  id: number;
  email: string;
  password: string;
  previledge: string[];
  defaultPassword: boolean;
}

type CreateAdminType = Omit<AdminModelInterface, "id" | "defaultPassword">

class Admin extends Model<AdminModelInterface, CreateAdminType> { }

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  defaultPassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true
  },
  previledge: {
    type: DataTypes.TEXT,
    get: function () {
      try {
        const result = JSON.parse((this.dataValues.previledge) as any);
        return result;
      } catch (error) { return []; }
    },
    set: function () {
      try {
        const result = JSON.stringify(this.dataValues.previledge);
        return result;

      } catch (error) { return "[]"; }
    }
  }
}, {
  sequelize: sequelize,
  modelName: "admin",
});

export default Admin;
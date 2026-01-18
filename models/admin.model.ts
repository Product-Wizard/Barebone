import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.config.js";
import bcrypt from "bcryptjs";
import config from "../config/config.js";

export interface AdminModelInterface {
  id: number;
  email: string;
  password?: string;
  previledge: string[];
  defaultPassword: boolean;
}

type CreateAdminType = Omit<AdminModelInterface, "id" | "defaultPassword">

class Admin extends Model<AdminModelInterface, CreateAdminType> {
  getAdminData() {
    const data = this.dataValues;
    delete data.password;
    return data;
  }
  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(`${password || config.DEFAULT_PASSWORD!}`, salt);
    return hashedPassword;
  }
}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
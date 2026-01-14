import { DataTypes, Model } from "sequelize";

import sequelize from "../config/db.config";

type company_size = "1-10" | "11-50" | "50+"
export interface OrganizationModelInterface {
  id: number;
  email: string;
  company_name: string;
  company_size: company_size;
  password?: string;
  defaultPassword: boolean;
}
export type CreateOrganizationType = Omit<OrganizationModelInterface, "id" | "defaultPassword">

class Organization extends Model<OrganizationModelInterface, CreateOrganizationType> {
  getOrganizationData() {
    const data = this.dataValues;
    delete data.password;
    return data;
  }
}

Organization.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  defaultPassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company_size: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize: sequelize,
  modelName: "Organization",
});

export default Organization;
import { DataTypes, Model, } from "sequelize";
import sequelize from "../config/db.config.js";
import { randomBytes } from "node:crypto"

export interface NewsLetterSubscriberModelInterface {
  id: number;
  email: string;
  deteteToken?: string;
}

export type CreateNewsLetterSubscriberType = Omit<NewsLetterSubscriberModelInterface, "id">

class NewsLetterSubscriber extends Model<NewsLetterSubscriberModelInterface, CreateNewsLetterSubscriberType> {
  getNewsLetterSubscriberData() {
    const data = this.dataValues;
    delete data.deteteToken;
    return data;
  }
}

NewsLetterSubscriber.init({
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
  deteteToken: {
    type: DataTypes.STRING,
    defaultValue: () => randomBytes(20).toString("hex"),
  }
}, {
  sequelize: sequelize,
  modelName: "news_letter_subscriber",
});

export default NewsLetterSubscriber;
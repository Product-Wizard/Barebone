import { DataTypes, Model, } from "sequelize";

import sequelize from "../config/db.config.js";

export interface NewsLetterSubscriberModelInterface {
  id: number;
  email: string;
}

export type CreateNewsLetterSubscriberType = Omit<NewsLetterSubscriberModelInterface, "id">

class NewsLetterSubscriber extends Model<NewsLetterSubscriberModelInterface, CreateNewsLetterSubscriberType> {
  getNewsLetterSubscriberData() {
    const data = this.dataValues;
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
  }
}, {
  sequelize: sequelize,
  modelName: "news_letter_subscriber",
});

export default NewsLetterSubscriber;
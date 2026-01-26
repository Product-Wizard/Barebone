import asyncHandeler from "express-async-handler";
import NewsLetterSubscriber from "../models/newsLetterSubscriber.model.js";
import NewsLetterValidators from "../validators/newsLetterSubscriber.validators.js";
import { Op } from "sequelize";


const createNewsLetterSubscriber = asyncHandeler(async (req, res, next) => {
  const { value, error } = NewsLetterValidators.createNewsLetterSubscriberValidator.validate(req.body);
  if (error) {
    res.status(400).json({
      error: true,
      data: null,
      message: error.details[ 0 ].message.replaceAll("_", " ")
        .replaceAll("[", " ")
        .replaceAll("]", " "),
    });
    return;
  }
  const existingNewsLetterSubscriber = await NewsLetterSubscriber.findOne({ where: { email: value.email } });
  if (existingNewsLetterSubscriber) {
    res.status(200).json({
      error: false,
      message: "you have sucesfully subscribed to our newsletter.",
      // message: "Sorry you already sunscribed to our newsletter.",
      data: null,
    });
    return;
  }
  const newsLetterSubscriber = await NewsLetterSubscriber.create(value);
  res.status(201).json({
    error: false,
    data: newsLetterSubscriber.getNewsLetterSubscriberData(),
    message: "you have sucesfully subscribed to our newsletter"
  })
});


const getNewsLetterSubscribers = asyncHandeler(async (req, res, next) => {
  const { page: stringPage, perPage: stringPerPage, ...othersQueryParams } = req.query
  const page = parseInt(stringPage as string || "1");
  const perPage = parseInt(stringPerPage as string || "50");
  const otherQueryKeys = Object.keys(othersQueryParams);
  const orQueryKeys: any[] | undefined = otherQueryKeys.length === 0 ? undefined :
    otherQueryKeys.map((key) => ({ [ key ]: { [ Op.like ]: `%${othersQueryParams[ key as any ]}%` } }));

  let whereQuery: any = {};
  if (orQueryKeys) whereQuery = { ...whereQuery, [ Op.or ]: [ ...orQueryKeys ] };
  const newsLettersSubscribers = await NewsLetterSubscriber.findAll({
    limit: perPage,
    order: [ [ "createdAt", "desc" ] ],
    offset: page > 1 ? (page - 1) * perPage : 0,
    where: whereQuery,
  });

  const totalNewsLetterSubscribers = await NewsLetterSubscriber.count({
    where: whereQuery,
  });
  const pagesCount = Math.ceil(totalNewsLetterSubscribers / perPage)
  res.status(200).json({
    error: false,
    data: newsLettersSubscribers,
    message: `newsletter subscribers on page ${page}`,
    pagination: {
      nextPage: page < pagesCount ? page + 1 : page,
      previousPage: page > 1 ? page - 1 : 0,
      totalPages: pagesCount
    }
  })
});

const deleteNewsLetterSubscriber = asyncHandeler(async (req, res, next) => {
  const newsLetterSubscriber = await NewsLetterSubscriber.findOne({ where: { id: req.params.id } });
  if (!newsLetterSubscriber) {
    res.status(404).json({ error: true, message: "Newsletter subscriber dosen't exist", data: null });
    return;
  }
  await newsLetterSubscriber.destroy();
  res.status(200).json({
    error: false,
    data: null,
    message: "Newsletter subscriber deleted"
  });
});

const NewsLetterSubscriberController = {
  createNewsLetterSubscriber,
  getNewsLetterSubscribers,
  deleteNewsLetterSubscriber,
}

export default NewsLetterSubscriberController;
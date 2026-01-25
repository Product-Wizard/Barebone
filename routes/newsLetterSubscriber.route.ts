import { Router } from "express";
import NewsLetterSubscriberController from "../controllers/newsLetterSubscriber.controller.js";
const {
  createNewsLetterSubscriber,
  getNewsLetterSubscribers,
  deleteNewsLetterSubscriber
} = NewsLetterSubscriberController;

const newsLetterSubscriberRoutes = Router();

newsLetterSubscriberRoutes.post("/", createNewsLetterSubscriber);
newsLetterSubscriberRoutes.get("/", getNewsLetterSubscribers);
newsLetterSubscriberRoutes.delete("/:id", deleteNewsLetterSubscriber);

export default newsLetterSubscriberRoutes;
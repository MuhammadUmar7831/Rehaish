import { errorHandler } from "../errors/error.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const createListing = async (req, res, next) => {
  try {
    const userId = req.userId;
    const validUser = await User.findById(userId);
    if (validUser === null) {
      return next(errorHandler(404, "user not found!"));
    }
    const listing = await Listing.create(req.body);
    return res.status(201).send({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  try {
    const userId = req.userId;
    const validUser = await User.findById(userId);
    if (validUser === null) {
      return next(errorHandler(404, "user not found!"));
    }
    const listing = await Listing.find({ userRef: userId });
    if (listing.length === 0){
      return next(errorHandler(404, 'no listing found'));
    }
    return res.status(201).send({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

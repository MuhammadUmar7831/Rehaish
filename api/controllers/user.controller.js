import User from "../models/user.model.js";

export const test = (req, res) => {
  res.status(200).send("Hello World!");
};

export const getUser = async (req, res) => {
  const user = await User.findById({ _id: req.userId });
  res.status(200).send({ success: true, user });
};

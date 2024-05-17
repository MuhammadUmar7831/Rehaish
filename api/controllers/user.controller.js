import User from "../models/user.model.js";

export const test = (req, res) => {
  res.status(200).send("Hello World!");
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId });
    res.status(200).send({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  const { name, avatar } = req.body;
  try {
    const user = await User.findById(req.userId);
    user.name = name;
    user.avatar = avatar;
    await user.save();
    res.status(200).send({ success: true, user });
  } catch (error) {
    next(error);
  }
};

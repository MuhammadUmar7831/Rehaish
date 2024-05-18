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

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.userId);
    if (!deletedUser) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    res.status(200).send({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

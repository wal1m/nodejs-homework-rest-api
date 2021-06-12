const User = require("./shemas/user");

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserByVerifyToken = async (token) => {
  return await User.findOne({ verifyToken: token });
};

const create = async (options) => {
  const user = new User(options);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const update = async (id, body) => {
  await User.updateOne({ _id: id }, { ...body });
  return body;
};

const updateAvatar = async (id, avatarURL, userIdImg = null) => {
  return await User.updateOne({ _id: id }, { avatarURL, userIdImg });
};

const updateVerifyToken = async (id, verify, token) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken: token });
};

module.exports = {
  findById,
  findByEmail,
  getUserByVerifyToken,
  create,
  updateToken,
  update,
  updateAvatar,
  updateVerifyToken,
};

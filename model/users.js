const User = require("./shemas/user");

const findById = async (id) => {
  return await User.findOne({ _id: id });
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
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

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  update,
  updateAvatar,
};

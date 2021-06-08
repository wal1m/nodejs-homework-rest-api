const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");

require("dotenv").config();
const Users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
const UploadAvatar = require("../services/upload-avatars-cloud");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        message: "Email is already used",
      });
    }
    const newUser = await Users.create(req.body);
    const { id, email, avatarURL } = newUser;
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id,
        email,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.validPassword(password);
    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1d" });
    await Users.updateToken(user.id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  await Users.updateToken(req.user.id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = await Users.findById(req.user.id);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = await Users.update(req.user.id, req.body);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;

    const uploadCloud = promisify(cloudinary.uploader.upload);
    const uploads = new UploadAvatar(uploadCloud);
    const { userIdImg, avatarUrl} = await uploads.saveAvatarToCloud(
      req.file.path,
      req.user.userIdImg
    );

    await Users.updateAvatar(id, avatarUrl, userIdImg);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: { avatarUrl },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  avatars,
};

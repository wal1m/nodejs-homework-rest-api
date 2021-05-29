const Contacts = require("../model/contacts");
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.getAll();
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getById(req.params.id);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not found contact by id",
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const contact = await Contacts.create(req.body);
    return res
      .status(HttpCode.CREATED)
      .json({ status: "success", code: HttpCode.CREATED, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.remove(req.params.id);
    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contact } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const contacts = await Contacts.update(req.params.id, req.body);
    if (contacts) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, data: { contacts } });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: "Not Found",
    });
  } catch (error) {
    next(error);
  }
};

// const updateStatusContact = async (req, res, next) => {
//   try {
//     const contact = await updateStatusContact(req.params.id, req.body);
//     if (contact) {
//       return res
//         .status(200)
//         .json({ status: "success", code: 200, data: { contact } });
//     }
//     return res.status(404).json({
//       status: "error",
//       code: 404,
//       message: "Not found",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};

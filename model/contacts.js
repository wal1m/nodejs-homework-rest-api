const fs = require("fs/promises");
// const contacts = require("./contacts.json");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4: uuid } = require("uuid");

//   (async function (from, to) {
//   try {
//     await fs.rename(from, to);
//     const stats = await fs.stat(to);
//     console.log(`stats: ${JSON.stringify(stats)}`);
//   } catch (error) {
//     console.error("there was an error:", error.message);
//   }
// })("/tmp/hello", "/tmp/world");

const getAll = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (contactId) => {
  try {
    const contacts = await getAll();
    return contacts.find(({ id }) => String(id) === contactId);
  } catch (error) {
    console.log(error);
  }
};

const remove = async (contactId) => {
  try {
    const contacts = await getAll();
    const deleteСontact = contacts.filter(({ id }) => String(id) !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(deleteСontact, null, 2));
    return contacts.find(({ id }) => String(id) === contactId);
  } catch (error) {
    console.log(error);
  }
};

const create = async (body) => {
  try {
    console.log("createModel");
    const id = uuid();
    const contacts = await getAll();
    contacts.push({ id, ...body });
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

const update = async (contactId, body) => {
  try {
    // const contact = await getById(contactId);
    // const contactUpdate = Object.assign(contact, body);
    // console.log(contactUpdate);
    const contacts = await getAll();
    contacts.map((contact) =>
      String(contact.id) === contactId ? Object.assign(contact, body) : body
    );
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts.find(({ id }) => String(id) === contactId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};

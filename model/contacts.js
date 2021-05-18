const fs = require("fs/promises");
// const contacts = require("./contacts.json");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4: uuid } = require("uuid");

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
    const detectContactId = contacts.find(({ id }) => String(id) === contactId);
    if (detectContactId) {
      const deleteСontact = contacts.filter(
        ({ id }) => String(id) !== contactId
      );
      await fs.writeFile(contactsPath, JSON.stringify(deleteСontact, null, 2));
      return detectContactId;
    }
  } catch (error) {
    console.log(error);
  }
};

const create = async (body) => {
  try {
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

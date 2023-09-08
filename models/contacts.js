const fs = require("fs/promises");
const path = require("path");

// ************************************************
const dbRootPath = path.join(__dirname, "./contacts.json");
const dbData = async () => JSON.parse(await fs.readFile(dbRootPath, "utf8"));
// ************************************************

const listContacts = async (req, res) => {
  const contactList = await dbData();
  res.json(contactList);
};
// ------------------------------------------------
const getContactById = async (contactId) => {};
// ------------------------------------------------

const removeContact = async (contactId) => {};
// ------------------------------------------------

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

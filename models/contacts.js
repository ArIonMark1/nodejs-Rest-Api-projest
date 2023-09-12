const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");
const { nanoid } = require("nanoid");

// ************************************************
const dbRootPath = path.join(__dirname, "./contacts.json");

const controlSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
// ************************************************

const listContacts = async () =>
  JSON.parse(await fs.readFile(dbRootPath, "utf8"));

// ------------------------------------------------
const getContactById = async (contactId) => {
  const contactList = await listContacts();

  const targetContact = contactList.find((contact) => contact.id === contactId);

  return targetContact || null;
};

// ------------------------------------------------
const addContact = async (body) => {
  const { error } = controlSchema.validate(body); // control body
  if (error) {
    return {
      status: 400,
      message: `Not correct data. ${error.message}`,
    };
  }
  const contactsList = await listContacts();
  const index = contactsList.findIndex(
    (contact) => contact.email === body.email && contact.phone === body.phone
  );
  if (index !== -1) {
    return {
      status: 409,
      message: "Contact already exists",
    };
  }
  const newContact = { id: nanoid(), ...body };
  await contactsList.push(newContact);
  await fs.writeFile(dbRootPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};
// ------------------------------------------------
const updateContact = async ({ contactId }, body) => {
  //
  const contactsList = await listContacts();
  const target = contactsList.findIndex((contact) => contact.id === contactId);
  // ***********************************
  const updatedContact = { ...contactsList[target], ...body };

  const { error } = controlSchema.validate(updatedContact);
  if (error) {
    return {
      status: 400,
      message: `Not correct data. ${error.message}`,
    };
  }
  contactsList.splice(target, 1, updatedContact);
  // ***********************************
  await fs.writeFile(dbRootPath, JSON.stringify(contactsList, null, 2));
  // ***********************************
  return updatedContact;
};

// ------------------------------------------------
const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const target = contactList.findIndex((contact) => contact.id === contactId);
  if (target === -1) {
    return false;
  }
  await contactList.splice(target, 1);
  await fs.writeFile(dbRootPath, JSON.stringify(contactList, null, 2));
  return true;
};

// ------------------------------------------------

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

const express = require("express");
// const contacts = require("../../models");

// ----------------------------------------------------------------
const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");

const dbRootPath = path.join(__dirname, "../../models/contacts.json");

const dbData = async () => JSON.parse(await fs.readFile(dbRootPath, "utf8"));

const dataById = async (id) => {
  const contactList = await dbData();
  const targetContact = contactList.find((contact) => contact.id === id);
  return targetContact || null;
};
const addContact = async (body) => {
  const contactsList = await dbData();
  await contactsList.push(body);
  await fs.writeFile(dbRootPath, JSON.stringify(contactsList, null, 2));
};
const handleDublicate = async ({ email, phone }) => {
  const contactsList = await dbData();
  const index = contactsList.findIndex(
    (contact) => contact.email === email && contact.phone === phone
  );
  return index === -1 ? null : index;
};
const updateContact = async ({ contactId }, body) => {
  try {
    const contactsList = await dbData();
    const target = contactsList.findIndex(
      (contact) => contact.id === contactId
    );

    const updatedContact = { ...contactsList[target], ...body };
    const { error } = controlSchema.validate(updatedContact);
    if (error) {
      throw HttpError(400, `Not cottect data. ${error.message}`);
    }
    contactsList.splice(target, 1, updatedContact);
    // дописати запис у базу даних(файл)
    // ***********************************
    // await fs.writeFile(dbRootPath, JSON.stringify(contactsList, null, 2));
    // ***********************************
    return contactsList;
  } catch (error) {
    return error;
  }
};

const router = express.Router();
const HttpError = require("../../helpers");
const { nanoid } = require("nanoid");

const controlSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
// ----------------------------------------------------------------
router.get("/", async (req, res, next) => {
  try {
    const contactList = await dbData();
    if (!contactList) {
      throw HttpError(404, "Data not finded");
    }
    res.json(contactList);
  } catch (error) {
    next(error);
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({ message });
  }
});

// ****************************************************************
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await dataById(contactId);

    if (!response) {
      throw HttpError(404, "Contact not found");
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// ****************************************************************
router.post("/", async (req, res, next) => {
  try {
    const { error } = controlSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `Not cottect data. ${error.message}`);
    }
    const newContact = { id: nanoid(), ...req.body };
    // перевірка чи контакт дублюється в базі --------------------
    const isExist = await handleDublicate(newContact);
    if (isExist) {
      throw HttpError(409, "Contact already exists");
    }
    await addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// ****************************************************************
router.put("/:contactId", async (req, res, next) => {
  //
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `missing fields`);
    }
    const result = await updateContact(req.params, req.body); // ok [{} {}] = err > {status, message}

    console.log("Arrived response: ", result?.status); // для контролю, при релізі видалити
    // CSSConditionRule.dir(response);
    if (result.status) {
      throw HttpError(result.status, result.message);
    }
    console.log("update response: ", result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// ****************************************************************
router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "DELETE template message" });
});

// ****************************************************************

module.exports = router;

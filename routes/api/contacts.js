const express = require("express");
const contacts = require("../../models");
const { nanoid } = require("nanoid");
const Joi = require("joi");

// =================================================================
const router = express.Router();
const HttpError = require("../../helpers");

const controlSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
// =================================================================
// get list of contact
router.get("/", async (req, res, next) => {
  try {
    const contactList = await contacts.listContacts();
    if (!contactList) {
      throw HttpError(404, "Data not finded");
    }
    res.json(contactList);
  } catch (error) {
    next(error);
  }
});

// ****************************************************************
// get contact by ID
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await contacts.getContactById(contactId);

    if (!response) {
      throw HttpError(404, "Contact not found");
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// ****************************************************************
// create contact
router.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `missing fields`);
    }
    const { error } = controlSchema.validate(req.body); // control body
    if (error) {
      throw HttpError(400, `Not cottect data. ${error.message}`);
    }
    const newContact = { id: nanoid(), ...req.body }; // create obj
    const isExist = await contacts.addContact(newContact);
    if (isExist) {
      throw HttpError(409, "Contact already exists");
    }
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// ****************************************************************
// update contact
router.put("/:contactId", async (req, res, next) => {
  //
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `missing fields`);
    }
    const result = await contacts.updateContact(req.params, req.body);

    if (result.status) {
      throw HttpError(result.status, result.message);
    }
    res.status(200).json(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// ****************************************************************
// delete contact
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteOperation = await contacts.removeContact(contactId);
    if (!deleteOperation) {
      throw HttpError(404, "Contact not found. ");
    }
    res
      .status(200)
      .json({ status: 200, message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// ****************************************************************

module.exports = router;

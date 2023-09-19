/* Основна логіка нашої програми */
/*Портуємо обробники БД !!*/
const contacts = require("../models");
const HttpError = require("../helpers/HttpError");
// ****************************************************************
const handlerRequest = require("../dbService/crudRequests");
// ------------------------------------

const getList = async (req, res, next) => {
  try {
    // const contactList = await contacts.listContacts();
    const contactList = await handlerRequest.allData();

    if (!contactList) {
      throw HttpError(404, "Data not finded");
    }
    res.json(contactList);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    // const response = await contacts.getContactById(contactId);
    const response = await handlerRequest.getContactById(contactId);

    // if (!response) {
    //   throw HttpError(404, "Contact not found");
    // }
    res.json(response);
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `missing fields`);
    }
    // const isExist = await contacts.addContact(req.body);
    const isExist = await handlerRequest.addContact(req.body);

    res.status(201).json(isExist);
  } catch (error) {
    next(error);
  }
};
const updateByID = async (req, res, next) => {
  //
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `Missing fields`);
    }
    // const result = await contacts.updateContact(req.params, req.body);
    const result = await handlerRequest.updateContact(req.params, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// зміна поля "favorite"
const updateStatusContact = async (req, res, next) => {
  try {
    // повинно повертати кастомну помилку
    if (!req.body) {
      throw HttpError(400, `Missing field favorite`);
    }

    const response = await handlerRequest.updateFavorite(req.params, req.body);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
const deleteByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const deleteOperation = await contacts.removeContact(contactId);
    const deleteOperation = await handlerRequest.removeContact(contactId);
    if (!deleteOperation) {
      throw HttpError(404, "Contact not found. ");
    }
    res
      .status(200)
      .json({ status: 200, message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// =================================================================
module.exports = {
  getList,
  getById,
  create,
  updateByID,
  updateStatusContact,
  deleteByID,
};

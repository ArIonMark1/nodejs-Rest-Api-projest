/* Основна логіка нашої програми */
/* Портуємо обробники БД !! */

const HttpError = require("../helpers/HttpError");
require("colors");
// ****************************************************************
const handlerRequest = require("../dbService/crudRequests");
// ------------------------------------

const getList = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contactList = await handlerRequest.allData(owner, req.query);

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
    const { _id: owner } = req.user;
    // const response = await contacts.getContactById(contactId);
    const response = await handlerRequest.getContactById(owner, contactId);

    if (!response || response.error) {
      if (!response) {
        throw HttpError(404, "Contact not found");
      }
      const { status, message } = response.error;
      throw HttpError(status, message);
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
};
// ****************************************************************
const create = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `missing fields`);
    }
    const isExist = await handlerRequest.addContact({ ...req.body, owner });
    if (isExist.error) {
      const { status, message } = isExist.error;
      throw HttpError(status, message);
    }
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
    const result = await handlerRequest.updateContact(
      req.params,
      req.user,
      req.body
    );
    if (!result) {
      throw HttpError(
        404,
        `Contact with ID '${req.params.contactId}' NOT FOUND`
      );
    }
    if (result.error) {
      const { status, message } = result.error;
      throw HttpError(status, message);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// зміна поля "favorite"
const updateStatusContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, `Missing field favorite`);
    }

    const response = await handlerRequest.updateFavorite(
      req.params,
      req.user,
      req.body
    );
    if (response.error) {
      const { status, message } = response.error;
      // console.log(`${status} "${message}"`.red);
      throw HttpError(status, message);
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
const deleteByID = async (req, res, next) => {
  try {
    const deleteOperation = await handlerRequest.removeContact(
      req.params,
      req.user
    );

    if (deleteOperation.error) {
      const { status, message } = deleteOperation.error;
      throw HttpError(status, message);
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

const ContactModel = require("./models/dbSchema");
const HttpError = require("../helpers/HttpError");
const EmailController = require("../helpers/EmailController");
require("colors");
// ************************************************

const allData = async (owner, { page = 1, limit = 5 }) => {
  try {
    const skip = (page - 1) * limit;

    const response = await ContactModel.find({ owner }, null, {
      skip,
      limit,
    }).populate("owner", "firstName lastName email subscription"); // пишемо назву поля яке треба поширити(
    //візьме ІД яке записане в полі type та піде у колекцію яка вказана в ref та в кінці поверне всі дані )
    // другим параметром передаємо список необхідних полів

    const filteredList = response.map(
      (contact) => contact.isDeleted === false && contact
    );
    return filteredList;
  } catch (error) {
    return null;
  }
};
// ------------------------------------------------
const getContactById = async (contactId) => {
  try {
    return await ContactModel.findById(contactId).where({
      isDeleted: false || null,
    });
  } catch (error) {
    return { error: { status: 400, message: "Wrong type of ID" } };
  }
};
// ------------------------------------------------
const addContact = async (body) => {
  try {
    const isDublicate = await EmailController(body);

    if (isDublicate) {
      throw HttpError(409, "Contact already exists");
    }
    return await ContactModel.create(body);
  } catch (error) {
    return { error: { status: error.status, message: error.message } };
  }
};
// ------------------------------------------------
const updateContact = async ({ contactId }, body) => {
  //
  try {
    // const { error } = UpdateContact.validate(body);
    // if (error) {
    //   throw HttpError(400, `Not correct data. ${error.message}`);
    // }
    const isDublicate = await EmailController(body);
    if (isDublicate) {
      throw HttpError(409, "This Email already exists. Please try again.");
    }
    const result = await ContactModel.findByIdAndUpdate(
      contactId,
      { $set: { ...body } },
      {
        new: true, // повертає нову, змінену, версію
        returnOriginal: false, //
      }
    );

    return result;
  } catch (error) {
    return {
      error: { status: error.status, message: error.message },
    };
  }
};
// ------------------------------------------------
const updateFavorite = async ({ contactId }, body) => {
  try {
    const favorite = Boolean(+body.favorite);

    return await ContactModel.findByIdAndUpdate(
      contactId,
      { $set: { favorite } },
      { new: true, returnOriginal: false }
    );
  } catch (error) {
    return { error: { status: 404, message: "Contact Not found" } };
  }
};
// ------------------------------------------------
const removeContact = async (contactId) => {
  try {
    return await ContactModel.findByIdAndUpdate(
      contactId,
      {
        $set: { isDeleted: true },
      },
      { returnOriginal: false }
    );
  } catch (error) {
    return {
      error: { status: 404, message: "Contact Not found" },
    };
  }
};
// ----------------------------------------------------------------
module.exports = {
  allData,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  removeContact,
};

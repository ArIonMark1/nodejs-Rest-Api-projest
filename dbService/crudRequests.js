const ContactModel = require("./models/dbSchema");
const HttpError = require("../helpers/HttpError");
const FindUserByEmail = require("../helpers/FindUserByEmail");
require("colors");
// ************************************************

const allData = async (owner, { page = 1, limit = 5 }) => {
  try {
    const skip = (+page - 1) * +limit;

    const response = await ContactModel.find({ isDeleted: false, owner }, null)
      .populate("owner", "firstName lastName email subscription")
      .skip(+skip)
      .limit(+limit); // пишемо назву поля яке треба поширити(
    //візьме ІД яке записане в полі type та піде у колекцію яка вказана в ref та в кінці поверне всі дані )
    // другим параметром передаємо список необхідних полів

    return response;
  } catch (error) {
    return null;
  }
};
// ------------------------------------------------
const getContactById = async (owner, contactId) => {
  try {
    return await ContactModel.findOne({
      _id: contactId,
      owner,
      isDeleted: false,
    }).populate("owner", "firstName lastName email subscription");
  } catch (error) {
    return { error: { status: 400, message: "Wrong type of ID" } };
  }
};
// ------------------------------------------------
const addContact = async (body) => {
  try {
    const isDublicate = await FindUserByEmail(body);

    if (isDublicate) {
      throw HttpError(409, "Contact already exists");
    }
    return await ContactModel.create(body);
  } catch (error) {
    return { error: { status: error.status, message: error.message } };
  }
};
// ------------------------------------------------
const updateContact = async ({ contactId }, { _id: owner }, body) => {
  //
  try {
    const isDublicate = await FindUserByEmail(body);
    if (isDublicate) {
      throw HttpError(409, "This Email already exists. Please try again.");
    }
    const result = await ContactModel.findOneAndUpdate(
      { _id: contactId, owner, isDeleted: false },
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
const updateFavorite = async ({ contactId }, { _id: owner }, body) => {
  try {
    const favorite = Boolean(+body.favorite);

    return await ContactModel.findOneAndUpdate(
      { _id: contactId, owner, isDeleted: false },
      { $set: { favorite } },
      { new: true, returnOriginal: false }
    );
  } catch (error) {
    return { error: { status: 404, message: "Contact Not found" } };
  }
};
// ------------------------------------------------
const removeContact = async ({ contactId }, { _id: owner }) => {
  try {
    const result = await ContactModel.findOneAndUpdate(
      { _id: contactId, owner },
      {
        $set: { isDeleted: true },
      },
      { returnOriginal: false }
    );
    if (!result) {
      throw HttpError(404);
    }
    return result;
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

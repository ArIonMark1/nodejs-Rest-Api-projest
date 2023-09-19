const ContactModel = require("./schemas/dbSchema");
// ************************************************

const allData = async () => {
  try {
    return await ContactModel.find({ isDeleted: false || null });
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
    return await ContactModel.create(body);
  } catch (error) {
    return { error: { status: 400, message: error.message } };
  }
};

// ------------------------------------------------
const updateContact = async ({ contactId }, body) => {
  //
  try {
    return await ContactModel.findByIdAndUpdate(
      contactId,
      { $set: { ...body } },
      {
        new: true,
        returnOriginal: false,
      }
    );
  } catch (error) {
    const message = error.message.split("::");
    return {
      error: { status: 400, message: `ErrorEmailDublicate: ${message.pop()}` },
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

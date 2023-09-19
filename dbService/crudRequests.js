const ContactModel = require("./schemas/dbSchema");
// ************************************************

const allData = async () => {
  return await ContactModel.find({ isDeleted: false || null });
};

// ------------------------------------------------
const getContactById = async (contactId) => {
  return await ContactModel.findById(contactId).where({
    isDeleted: false || null,
  });
};

// ------------------------------------------------
const addContact = async (body) => {
  return await ContactModel.create(body);
};

// ------------------------------------------------
const updateContact = async ({ contactId }, body) => {
  //
  return await ContactModel.findByIdAndUpdate(
    contactId,
    { $set: { ...body } },
    {
      new: true,
      returnOriginal: false,
    }
  );
};
const updateFavorite = async ({ contactId }, body) => {
  const favorite = Boolean(+body.favorite);

  return await ContactModel.findByIdAndUpdate(
    contactId,
    { $set: { favorite } },
    { new: true, returnOriginal: false }
  );
};
// ------------------------------------------------
const removeContact = async (contactId) => {
  return (
    (await ContactModel.findByIdAndUpdate(
      contactId,
      {
        $set: { isDeleted: true },
      },
      { returnOriginal: false }
    )) || null
  );
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

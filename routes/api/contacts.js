const express = require("express");
const controller = require("../../controller");
const router = express.Router();

const {
  CreateContact,
  UpdateContact,
} = require("../../verifier/contactSchema");
// const HttpError = require("../../helpers");
const isValidId = require("../../middlewares/isValidId"); // для перевірки валідності ID
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");

// get list of contact
router.get("/", authenticate, controller.getList);

// get contact by ID
router.get("/:contactId", authenticate, isValidId, controller.getById);

// create contact
router.post("/", authenticate, validateBody(CreateContact), controller.create);

// update contact
router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(UpdateContact),
  controller.updateByID
);

// patch update contact field "favorite"
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(UpdateContact),
  controller.updateStatusContact
);

// delete contact
router.delete("/:contactId", authenticate, isValidId, controller.deleteByID);

module.exports = router;

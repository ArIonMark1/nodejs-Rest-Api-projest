const express = require("express");
const controller = require("../../controller");
const router = express.Router();
// const HttpError = require("../../helpers");
const isValidId = require("../../helpers/isValidId"); // для перевірки валідності ID

// get list of contact
router.get("/", controller.getList);

// get contact by ID
router.get("/:contactId", isValidId, controller.getById);

// create contact
router.post("/", controller.create);

// update contact
router.put("/:contactId", isValidId, controller.updateByID);

// patch update contact field "favorite"
router.patch("/:contactId/favorite", isValidId, controller.updateStatusContact);

// delete contact
router.delete("/:contactId", isValidId, controller.deleteByID);

module.exports = router;

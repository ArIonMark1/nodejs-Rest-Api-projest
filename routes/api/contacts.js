const express = require("express");
const controller = require("../../controller");
const router = express.Router();
const HttpError = require("../../helpers");

// get list of contact
router.get("/", controller.getList);

// get contact by ID
router.get("/:contactId", controller.getById);

// create contact
router.post("/", controller.create);

// update contact
router.put("/:contactId", controller.updateByID);

// delete contact
router.delete("/:contactId", controller.deleteByID);

module.exports = router;

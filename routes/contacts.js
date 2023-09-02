const express = require("express");
const {
  getAllContactsController,
  addContactController,
  deleteContactController,
  updateContactController,
} = require("../controllers/contactControllers");
const validateBody = require("../middlewares/validateBody");
const { fullContactSchema } = require("../schemas/contactSchema");
const checkId = require("../middlewares/checkId");

const authentificate = require("../middlewares/authentificate");

const router = express.Router();

router.get("/", authentificate, getAllContactsController);

router.post(
  "/",
  authentificate,
  validateBody(fullContactSchema),
  addContactController
);

router.delete("/:contactId", authentificate, checkId, deleteContactController);

router.put(
  "/:contactId",
  authentificate,
  checkId,
  validateBody(fullContactSchema),
  updateContactController
);

module.exports = router;

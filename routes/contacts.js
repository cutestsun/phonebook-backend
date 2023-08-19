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

const router = express.Router();

router.get("/", getAllContactsController);

router.post("/", validateBody(fullContactSchema), addContactController);

router.delete("/:contactId", checkId, deleteContactController);

router.put(
  "/:contactId",
  checkId,
  validateBody(fullContactSchema),
  updateContactController
);

module.exports = router;

const {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
} = require("../services/contactServices");
const HttpError = require("../helpers/HttpError");

const getAllContactsController = async (req, res) => {
  const result = await getContacts();

  res.json(result);
};

const addContactController = async (req, res) => {
  const result = await addContact(req.body);

  res.status(201).json(result);
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await deleteContact(contactId);

    if (!result) {
      throw HttpError(404, "not found");
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, number } = req.body;

    const result = await updateContact(contactId, { name, number });

    if (!result) {
      throw HttpError(404, "not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContactsController,
  addContactController,
  deleteContactController,
  updateContactController,
};

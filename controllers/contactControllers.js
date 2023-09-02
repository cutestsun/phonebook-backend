const {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
} = require("../services/contactServices");
const HttpError = require("../helpers/HttpError");

const getAllContactsController = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await getContacts(owner);

  res.json(result);
};

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact({ ...req.body, owner });

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

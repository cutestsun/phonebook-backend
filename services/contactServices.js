const Contact = require("../db/models/contactModel");

const getContacts = async () => {
  const contacts = await Contact.find({});

  return contacts;
};

const addContact = async (data) => {
  const contact = await Contact.create(data);

  return contact;
};

const deleteContact = async (id) => {
  const contact = await Contact.findByIdAndRemove(id);

  return contact;
};

const updateContact = async (id, data) => {
  const contact = await Contact.findByIdAndUpdate(id, data, { new: true });

  return contact;
};

module.exports = {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
};

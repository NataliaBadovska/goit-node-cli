const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath)
  return JSON.parse(allContacts);
}


async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId)
    return result || null;    
}

async function removeContact(contactId) {
 
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)

  if (index === -1) {
     return null 
  } 
   
  const removed = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return removed;
}

async function addContact(name, email, phone) {

  const contacts = await listContacts();
  const newContacts = {
    name,
    email,
    phone,
    id: nanoid()
  }
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts;
}
 
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}
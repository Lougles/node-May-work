const fs = require("fs").promises;
const path = require('path');
const { v4 } = require('uuid');
const contactsPath = "./db/contacts.js";


// contacts.js

// /*
//  * Раскомментируй и запиши значение
//  */

// TODO: задокументировать каждую функцию
// function listContacts() {
//   fs.readFile(contactsPath)
//   .then((data) => {
//       console.table(JSON.parse(data));
//   },)
//   .catch((err) => console.log(err.message));
// }

const listContacts = async () => {
  try{
    const data = await fs.readFile(contactsPath, 'utf-8');
    console.table(JSON.parse(data));
    return result = JSON.parse(data);
  }catch(err) {
    console.log(err.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(data);
    const result = list.find(item => parseInt(item.id) === parseInt(contactId));
    console.table(result);
    return result;
  }catch (err) {
    console.log(err.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const list = JSON.parse(data);
    const result = list.filter(item => parseInt(item.id) !== parseInt(contactId));
    fs.writeFile(contactsPath, JSON.stringify(result));
    console.log(result);
    return result;
  }catch (err) {
    console.log(err.message);
  }
}

const addContact = async (name, email, phone) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');

  }catch (err) {
    console.log(err.message);
  }
}

listContacts();

getContactById(5);

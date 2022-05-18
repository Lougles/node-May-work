const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');
const jsonFile = './contacts.json';
const newPath = path.join(__dirname, jsonFile);


const listContacts = async () => {
  try{
    const data = await fs.readFile(newPath, 'utf-8');
    console.table(JSON.parse(data));
    return result = JSON.parse(data);
  }catch(err) {
    console.log('we are here', err);
  }
}


const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(newPath, 'utf-8');
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
    const data = await fs.readFile(newPath, 'utf-8');
    const list = JSON.parse(data);
    const result = list.filter(item => (item.id) !== (contactId));
    fs.writeFile(newPath, JSON.stringify(result));
    console.table(result);
    return result;
  }catch (err) {
    console.log(err.message);
  }
}
const addContact = async (body) => {
  try {
    const data = await fs.readFile(newPath, 'utf-8');
    const list = JSON.parse(data);
    list.push({
      id: v4(),
      ...body
    });
    fs.writeFile(newPath, JSON.stringify(list));
    return list[list.length-1];
  } catch (err) {
    console.log(err);
  }
}

const updateContact = async (contactId, body) => {

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
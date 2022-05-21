// const fs = require("fs").promises;
// const path = require('path');
// const { v4 } = require('uuid');
// const contactsPath = "./db/contacts.js";


// const listContacts = async () => {
//   try{
//     const data = await fs.readFile(contactsPath, 'utf-8');
//     console.table(JSON.parse(data));
//     return result = JSON.parse(data);
//   }catch(err) {
//     console.log(err.message);
//   }
// }

// const getContactById = async (contactId) => {
//   try {
//     const data = await fs.readFile(contactsPath, 'utf-8');
//     const list = JSON.parse(data);
//     const result = list.find(item => parseInt(item.id) === parseInt(contactId));
//     console.table(result);
//     return result;
//   }catch (err) {
//     console.log(err.message);
//   }
// }

// const removeContact = async (contactId) => {
//   try {
//     const data = await fs.readFile(contactsPath, 'utf-8');
//     const list = JSON.parse(data);
//     const result = list.filter(item => (item.id) !== (contactId));
//     fs.writeFile(contactsPath, JSON.stringify(result));
//     console.table(result);
//     return result;
//   }catch (err) {
//     console.log(err.message);
//   }
// }

// const addContact = async (name, email, phone) => {
//   try {
//     const data = await fs.readFile(contactsPath, 'utf-8');
//     const list = JSON.parse(data);
//     const result = list.push({
//       id: v4(),
//       name,
//       email,
//       phone
//     })
//     fs.writeFile(contactsPath, JSON.stringify(list));
//     console.table(list[list.length-1]);

//   }catch (err) {
//     console.log(err.message);
//   }
// }



// // module.exports = {
// //   listContacts,
// //   getContactById,
// //   removeContact,
// //   addContact
// // }
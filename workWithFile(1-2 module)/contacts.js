const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');
const jsonFile = './contacts.json';
const newPath = path.join(__dirname, jsonFile);

function uid() {
  return (performance.now().toString(10)+Math.random().toString(10)).replace(/\./g,"");
};


const listContacts = async () => {
  try{
    const data = await fs.readFile(newPath, 'utf-8');
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
    return result;
  }catch (err) {
    console.log(err.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(newPath, 'utf-8');
    const list = JSON.parse(data);
    const result = list.filter(item => parseInt(item.id) !== parseInt(contactId));
    fs.writeFile(newPath, JSON.stringify(result));
    return result;
  }catch (err) {
    console.log('problem here',err.message);
  }
}
const addContact = async (body) => {
  try {
    const data = await fs.readFile(newPath, 'utf-8');
    const list = JSON.parse(data);
    list.push({
      id: uid(),
      ...body
    });
    fs.writeFile(newPath, JSON.stringify(list));
    return list[list.length-1];
  } catch (err) {
    console.log(err);
  }
}
const updateContact = async (contactId, body) => {
  try{
    const data = await fs.readFile(newPath, 'utf-8');
    const list = JSON.parse(data);
    list.map(item => {
      if (item.id === parseInt(contactId)) {
        Object.assign(item, body);
      }
    })
    fs.writeFile(newPath, JSON.stringify(list));
    console.log(list);
    return list;
  } catch (err) {
    console.log(err);
  }
}

// It's working with forEach way.
// const testUpdateContact = async (contactId, body) => {
//   try{
//     const data = await fs.readFile(newPath, 'utf-8');
//     let list = JSON.parse(data);
//     const { name, email, phone } = body;
//     list.forEach(list => {
//       if (list.id === contactId) {
//         list.name = name,
//         list.email = email,
//         list.phone = phone
//       }
//     })
//     console.log(list);
//     fs.writeFile(newPath, JSON.stringify(list));
//   }catch(e){
//     console.log(e);
//   }
// }


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
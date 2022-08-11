// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
require('dotenv').config();
GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const storage = new Storage();
const bucketName = 'may-work-test';

async function uploadAva(filePath, destFileName) {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
};

async function downloadFile(fileName, destFileName) {
  const options = {
    destination: destFileName,
  };
  await storage.bucket(bucketName).file(fileName).download(options);
}

module.exports = {
  uploadAva,
  downloadFile
}
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
const bucketName = 'may-work-test';
const filePath = 'public/629f6fd60890ad63163bf28d/17adeda6-f593-4018-8847-d2325a147409.jpeg';
const destFileName = '17adeda6-f593-4018-8847-d2325a147409.jpeg';

async function createBucket() {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });
  console.log(`${filePath} uploaded to ${bucketName}`);
};

createBucket().catch(console.error)
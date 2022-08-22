// const { describe } = require("yargs");
const {getUserById} = require('../src/services/contactService');
const {WrongIdError} = require('../src/helpers/errors');
const {Contact} = require('../src/db/contactsModel')

describe('Posts service getUserById tests', () => {
  it('should return post data by ID', async() => {
    const mPostId = '1';
    const mUserId = '2';
    const post = {
      _id: mPostId,
      topic: 'topic',
      userId: mUserId,
      text: 'text'
    }
    jest.spyOn(Contact, 'findOne').mockImplementationOnce(() => post)
    const result = await getUserById(mPostId, mUserId);
    expect(result._id).toEqual(mPostId);
    expect(result.userId).toEqual(mUserId);
    expect(result.topic).toBeDefined();
    expect(result.text).toBeDefined();
  })
})


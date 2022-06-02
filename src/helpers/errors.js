class validationError extends Error {
  constructor(message){
    super(message);
    this.status = 400;
  }
}

class WrongIdError extends Error {
  constructor(message){
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends Error {
  constructor(message){
    super(message);
    this.status = 401;
  }
}

module.exports = {
  validationError,
  WrongIdError,
  NotAuthorizedError
}
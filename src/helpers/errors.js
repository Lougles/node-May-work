class Nodejs26Error extends Error {
  constructor(message){
    super(message);
    this.status = 400;
  }
}
class validationError extends Nodejs26Error {
  constructor(message){
    super(message);
    this.status = 400;
  }
}

class WrongIdError extends Nodejs26Error {
  constructor(message){
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends Nodejs26Error {
  constructor(message){
    super(message);
    this.status = 401;
  }
}

class UpdateSubscribeError extends Nodejs26Error {
  constructor(message){
    super(message);
    this.status = 400;
  }
}

module.exports = {
  Nodejs26Error,
  validationError,
  WrongIdError,
  NotAuthorizedError,
  UpdateSubscribeError
}
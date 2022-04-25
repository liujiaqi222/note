class CustomError extends Error {
  constructor(messgae, statusCode) {
    super(messgae);
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
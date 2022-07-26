const errors = require("./errors.constants");

const errorHandler = ({ err, res }) => {
  if (errors[err]) {
    const errorObj = errors[err];
    res.status(errorObj.status).send({ error: errorObj.error });
  } else {
    res.status(500).send({ error: "An error has occured." });
  }
};

module.exports = errorHandler;

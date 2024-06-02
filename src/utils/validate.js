const ErrorHandler = require("../utils/ErrorHandler");

const validate = (schema) => (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
  
      next();
    } catch (error) {
    const message = error;
      return res.status(400).json({type:error.errors[0].path[1], message: error.errors[0].message});
    }
  };

  module.exports = validate
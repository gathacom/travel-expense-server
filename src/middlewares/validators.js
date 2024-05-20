const { userSchema } = require("../schemas/user");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports.validateUser = async (req, res, next) => {
  const { error } = userSchema.parse(req.body);
  if (error) {
    const message = error.message.ZodError;
    res.status(400).json({
      success: false,
    })
    // return next(new ErrorHandler(message, 400));
  } else {
    next();
  }
};


const { createUserSchema } = require("../schemas/user");

module.exports.validateUser = (req, res, next) => {
  const { error, value } = createUserSchema.validate(req.body);
  if (error) {
    const message = error.details
      .map((e) => {
        let message = e.message;
        if (message.includes('"passwordRepeated" must be [ref:password]')) {
          message = "The repeated password must match the original password.";
        } else {
          // Replace quotation marks around field names for clarity
          message = message.replace(/\"/g, "'");
        }
        return message;
      })
      .join(", ");

    res.status(400).json({ error: message });
  } else {
    req.validatedUser = value;
    next();
  }
};

const { object, z } = require("zod");

module.exports.userSignInSchema = object({
  body: object({
    username: z
    .string()
    .min(3, { message: "Username must be 3 or more characters long" })
    .max(32, { message: "Username must be 32 or less characters long" }),
  email: z.string().email({message: "Must be a valid email"}),
  password: z.string()
  .min(8, { message: "Password must be 8 or more characters long" })
  .max(32, { message: "Password must be 32 or less characters long" }),
  })
});

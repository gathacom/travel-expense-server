const { object, z } = require("zod");

module.exports.expenseSchema = object({
  body: object({
    title: z
    .string()
    .min(3, { message: "Title must be 3 or more characters long" })
    .max(32, { message: "Title must be 32 or less characters long" }),
    amount: z
    .number(),
    description: z
    .string().nullable(),
  })
});

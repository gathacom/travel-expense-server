const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.isValidExpense = async (req, res, next) => {
    const tripId = req.params.tripId
    const expenseId = req.params.id;
    const expense = await prisma.expense.findUnique({
        where: {
            id: expenseId,
            tripId: tripId,
        }
    })
    if(!expense) {
        return res.status(400).json({ message: 'Expense not found' })
    }
    next()
}
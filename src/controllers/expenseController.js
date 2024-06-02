const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.getByTrip = async (req, res) => {
  const tripId = req.params.tripId;
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        tripId: tripId,
      },
    });

    return res.status(200).json({ expenses });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports.getById = async (req, res) => {
  const tripId = req.params.tripId;
  const expenseId = req.params.id;

  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId,
        tripId: tripId,
      },
    });

    return res.status(200).json({ expense });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports.store = async (req, res) => {
  const { title, description, amount, tripId } = req.body;
  // console.log(req.body)
  try {
    const newExpense = await prisma.expense.create({
      data: {
        title: title,
        description: description,
        amount: amount,
        tripId: tripId,
      },
    });
    return res.status(200).json({
      newExpense,
      isCreated: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports.update = async (req, res) => {
    const {id, tripId} = req.params
  const { title, description, amount } = req.body;
  try {
    const newExpense = await prisma.expense.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
        amount: amount,
        tripId: tripId,
      },
    });
    return res.status(200).json({
      newExpense,
      isUpdated: true,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports.destroy = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedExpense = await prisma.expense.delete({
            where: {
                id: id
            }
        })
        return res.status(200).json({
            deletedExpense,
            isDeleted: true
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
};

module.exports.totalExpenses = async (req, res) => {
    
};



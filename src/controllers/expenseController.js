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
  const userId = req.user
  console.log(userId)
  
  try {
    const totalExpenses = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        trip: {
          userId: userId
        }
      }
    });

    res.json({ totalExpense: totalExpenses._sum.amount });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};
module.exports.totalExpensesByTrip = async (req, res) => {
  const userId = req.user
  const { tripId } = req.params
  try {
    // Memeriksa apakah perjalanan dengan tripId tersebut milik user yang sedang login
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { user: true },
    });

    if (!trip || trip.user.id !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const totalExpenses = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        tripId: tripId,
      },
    });

    res.json({ totalExpense: totalExpenses._sum.amount || 0 });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
};



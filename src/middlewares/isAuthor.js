const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.isAuthor = async (req, res, next) => {
  const { authorization } = req.headers;
  const tripId = req.params.tripId || req.body.tripId;
  if (!authorization) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId,
      },
    });
    
    if (user.id !== trip.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = user.id;
    next();
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
};

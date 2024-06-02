const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.isValidTrip = async (req, res, next) => {
    const tripId = req.params.tripId || req.body.tripId;
    const trip = await prisma.trip.findUnique({
        where: {
            id: tripId
        }
    })
    if(!trip) {
        return res.status(400).json({ message: 'Trip not found' })
    }
    next()
}
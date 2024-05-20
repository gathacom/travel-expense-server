const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.showAll = async (req, res) => {
    try {
        trips = await prisma.trip.findMany({})
        return res.status(200).json({ trips })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
module.exports.getById = async (req, res) => {
    const id = req.params.id
    try {
        const trip = await prisma.trip.findUnique({
            where: {
                id: id
            }
        })
        return res.status(200).json({ trip })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
module.exports.getByAuthor = async (req, res) => {
    const userId = req.user
    try {
        userTrips = await prisma.trip.findMany({
            where: {
                userId: userId
            }
        })
        return res.status(200).json({ userTrips })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
module.exports.store = async (req, res) => {
    const { title, description } = req.body
    console.log(req.body)
    try {
        const existingTrip = await prisma.trip.findFirst({
            where: {
                title: title
            }
        })
        if(existingTrip) {
            return res.status(400).json({ message: 'Title already used' })
        }

        const newTrip = await prisma.trip.create({
            data: {
                title: title,
                description: description,
                userId: req.user,
            }
        })
        return res.status(200).json({
            newTrip,
            isCreated: true
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
module.exports.update = async (req, res) => {
    const id = req.params.id
    const tripData = req.body
    try {
        const existingTrip = await prisma.trip.findUnique({
            where: {
                id: id
            }
        })
        if(!existingTrip) {
            return res.status(400).json({ message: 'Trip not found' })
        }
        const newTrip = await prisma.trip.update({
            where: {
                id: id
            }
            , data: {
                title: tripData.title,
                description: tripData.description
            }
        })
        return res.status(200).json({
            newTrip,
            isUpdated: true
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
module.exports.destroy = async (req, res) => {
    const tripId = req.params.id;
    try {
        const deletedTrip = await prisma.trip.delete({
            where: {
                id: tripId
            }
        })
        return res.status(200).json({
            deletedTrip,
            isDeleted: true
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}
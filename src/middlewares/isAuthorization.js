const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.isAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    const token = authorization.split(" ")[1];
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
    req.user = user.id;
    next();
}
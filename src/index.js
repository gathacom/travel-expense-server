const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");


const app = express();
const prisma = new PrismaClient();

dotenv.config();

const PORT = process.env.PORT;

//midleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
})

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/trip"));
app.use("/", require("./routes/expense"));

app.listen(PORT, () => console.log(`Server started on port : ${PORT}` ));
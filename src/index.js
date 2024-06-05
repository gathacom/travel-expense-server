const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: [
      "*",
      "http://localhost:3000",
      "https://travel-expense-client-dot-project-akhir-tcc.as.r.appspot.com"
    ],
  })
);

//midleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({ users });
});
app.get("/", async (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/", require("./routes/auth"));
app.use("/", require("./routes/trip"));
app.use("/", require("./routes/expense"));

app.listen(PORT, () => console.log(`This Server started on port : ${PORT}`));

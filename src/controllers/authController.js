const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY || "getOutOfHereBtch"

module.exports.signUp = async (req, res)=>{
    const { username, password, email } = req.body
    console.log(req.body)
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
              OR: [{ email }, { username }],
            },
          });
      
          if (existingUser) {
            if (existingUser.email === email) {
              return res.status(400).json({ type: 'email', message: 'Email already used' });
            } else {
              return res.status(400).json({ type: 'username', message: 'Username already used' });
            }
          }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword =  bcrypt.hashSync(password, salt);
        await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                email : email
            }
        })
        return res.status(200).json({
            isCreated: true,
        })
    } catch (error) {
        return res.status(400).json({
            isCreated: false,
            error: error.message
        })
    }
}
module.exports.signIn = async (req, res)=>{
    const { email, password } = req.body
    console.log(req.body)
    try {
        const user = await prisma.user.findFirst({ where: {
            OR: [{ email }],
          },
        });
        if(!user){
            return res.status(400).json({ message: 'Email or username and password not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Email or username and password not found' });
        }
        const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, { expiresIn: '1d' });
        delete user.password
        return res.status(200).json({ user : user, token : token })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.checkUser = async (req, res)=>{
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, SECRET_KEY);
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
    return res.status(200).json({
        success: true,
        user: user
    })

}

module.exports.logout = async (req, res)=>{
}

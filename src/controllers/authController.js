const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET_KEY

module.exports.signUp = async (req, res)=>{
    const { username, password, email } = req.body
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
              OR: [{ email }, { username }],
            },
          });
      
          if (existingUser) {
            if (existingUser.email === email) {
              return res.status(400).json({ message: 'Email already used' });
            } else {
              return res.status(400).json({ message: 'Username already used' });
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
        res.status(200).json({
            isCreated: true,
        })
    } catch (error) {
        res.status(400).json({
            isCreated: false,
            error: error.message
        })
    }
}
module.exports.signIn = async (req, res)=>{
    const { email, username, password } = req.body
    try {
        const user = await prisma.user.findFirst({ where: {
            OR: [{ email }, { username }],
          },
        });
        if(!user){
            return res.status(400).json({ message: 'Email or username and password not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Email or username and password not found' });
        }
        const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ result: user, token })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.logout = async (req, res)=>{
    
}
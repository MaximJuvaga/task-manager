const {prisma} = require('../config/database.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res,next) => { 
     try{
        const{name,email,password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Пользователь с таким email уже существует"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data: {
                name:name,
                email:email,
                password:hashedPassword,
            }
        })
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET||"secret-key", {expiresIn: '7d'});
        res.status(201).json({
            success: true,
            message:"Пользователь успешно зарегистрирован ",
            data:{
                user:{
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            },
            token: token
            }
            
        })
     }catch(error){
        next(error);
     }
}
const login = async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        const user = await prisma.user.findUnique({
            where:{
                email:email,
            }
        });
        if(!user){
            return res.status(401).json({
                message:"Неверный email",
                success:false,
            });
        };
        const ifPasswordValid = await bcrypt.compare(password,user.password);
        if(!ifPasswordValid){
            return res.status(401).json({
                message:"Неверный пароль",
                success:false,
            })
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET||"secret-key", {expiresIn: '7d'});
        
        res.status(200).json({
            success:true,
            message:"Пользователь успешно зарегистрирован",
            data:{
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    createdAt:user.createdAt,
                },
                token:token,
            },
        });

    } catch (error) {
        next(error);
    }

}
const getProfile = async (req,res,next)=>{
    try {
       const userId = req.userId;
       const user = await prisma.user.findUnique({
        where:{
            id:userId,
        },
        select:{
            id:true,
            name:true,
            email:true,
            createdAt:true,
            updatedAt:true,
        },
       })

       if(!user){
        return res.status(404).json({
            message:"Пользователь не найден",
            success:false,
        })
       }

       res.status(200).json({
        success:true,
        data:{
            user:user,
        }
       })
    } catch (error) {
        next(error);
    }
}

module.exports={register,login,getProfile}

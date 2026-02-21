const jwt = require("jsonwebtoken")
const authMiddleware = async(req,res,next)=>{
try{
const authHeder = req.headers.authorization;
if(!authHeder||!authHeder.startsWith("Bearer")){
    return res.status(401).json({
        succes:false,
        message:"Ошибка токена1"
    })
}
const token =authHeder.split(" ")[1]
const decoded = jwt.verify(token,process.env.JWT_SECRET||"sekret-key")

req.userID = decoded.userID
next()

}catch (error) {
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,  // ← Проверь, что здесь "success" а не "succes"
      message: 'Token expired. Please login again.'
    });
  }
  
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,  // ← Проверь, что здесь "success" а не "succes"
      message: 'Invalid token. Please login again.'
    });
  }
  
  next(error);
}
}

module.exports = authMiddleware;
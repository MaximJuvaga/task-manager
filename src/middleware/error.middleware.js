const errorHandler =(error,req,res,next)=>{
    console.error("Error: ",error.stack);
    const statusCode = res.statusCode ===200?500:res.statusCode;
    res.status(statusCode).json({
        message:error.message||"Internet server error",
        ...(process.env.NODE_ENV==="development"&&{stack:error.stack})
    });

};

module.exports = errorHandler;
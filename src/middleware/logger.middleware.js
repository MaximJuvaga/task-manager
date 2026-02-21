
const logger = (req,res,next)=>{
    const timestamp = new Date().toISOString();
     const method = req.metod||"UNKNOWN";
     const url = req.ur||"/";
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
}
module.exports = logger;
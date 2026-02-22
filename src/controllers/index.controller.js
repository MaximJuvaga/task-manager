const getHome = (req,res)=>{
    res.send("Hello");
};

const getHealt=(req,res)=>{
    res.json({
        status:"ok",
        message:"Server all ok",
        timestamp:new Date().toISOString()
    });
}

module.exports = {getHome,getHealt};
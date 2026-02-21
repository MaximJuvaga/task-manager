const express = require("express");
const logger = require("./src/middleware/logger.middleware");
const errorHandler=require("./src/middleware/error.middleware");

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT||5000;

app.use(express.json())
app.use(logger)
const authRouters=require("./src/routes/auth.routes")
app.use('/api/auth',authRouters)



// const indexRoutes =require("./src/routes/index.routes");
// app.use("/",indexRoutes)
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV||"devolpment"}`)
});
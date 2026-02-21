const express = require("express");
const router = express.Router();

const{getHome,getHealt}=require("../controllers/index.controller.js");

router.get("/",getHome);
router.get("/healt",getHealt);

module.exports = router;
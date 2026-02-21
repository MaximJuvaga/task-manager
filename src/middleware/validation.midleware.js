const {body, validationResult}=require("express-validator")

const validateRegister=[
    body("name").trim().notEmpty().withMessage("Треубется имя").isLength({min :2,max:20}).withMessage("длина имени должна составлять от 2 до 20"),
    body("email").trim().notEmpty().withMessage("требуется почта").isEmail().normalizeEmail(),
    body("password").notEmpty().withMessage("требуется пароль").isLength({min:6}).withMessage("Минимум 6 символов"),
]
const validateLogin=[
    body("email").trim().notEmpty().withMessage("требуется почта").isEmail().withMessage("неверный формат").normalizeEmail(),
    body("password").notEmpty().withMessage("требуется пароль")
]

const handleValidationErrors=(res,req,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            succes:false,
            message:"Ошибка валидации",
            errors:errors.array().map(err=>({
                field:err.param,
                message:err.msg
            }))

        })
    }

    next()

}
module.exports={
    validateRegister,validateLogin,handleValidationErrors
}
const express=require("express")
const authContoller=require("../controllers/auth.controller")

const router=express.Router()
//POST /api/auth/register
router.post("/register",authContoller.userRegisterController)

//POST /api/auth/login
router.post("/login",authContoller.userLoginController)
module.exports=router




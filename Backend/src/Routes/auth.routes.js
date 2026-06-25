import express from "express" ;
import { login,logout,signup,updateProfile,authcheck } from "../Controller/auth.controller.js";
import { protectRoute } from "../Middleware/auth.middleware.js";


const router = express.Router()

router.post("/signup", signup)
router.post("/login",login )
router.post("/logout",logout )

router.put("/update-profile", protectRoute,updateProfile)
router.get("/check",protectRoute , authcheck)

export default router
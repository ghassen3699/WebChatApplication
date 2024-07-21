import express from "express" ;
import { loginUser, signupUser, logoutUser } from "../controllers/auth.controller.js";
const router = express.Router() ;


// Login route
router.post('/login', loginUser) ;

// Signup route
router.post('/signup', signupUser) ;

// logout route
router.post('/logout', logoutUser) ;

export default router ;
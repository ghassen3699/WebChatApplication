import express from "express" ;
import { sendMessage } from '../controllers/message.controller.js' ;
import { getMessages } from '../controllers/message.controller.js' ;
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router() ;

router.route('/send/:id').get(protectRoute, getMessages) ;
router.post('/send/:id', protectRoute ,sendMessage) ;

export default router ;
import { Router } from 'express'

import express from 'express'
import { login, registroUsuarios,getUsuarios,notFound,home } from '../controllers/index.js'
import { authenticateToken } from '../middleware/authenticate.js'
import {log} from "../middleware/log.js"

const router = express.Router()
router.use(log)

router.get("/", home);
//router.get('/usuarios',getUsuarios)

router.get('/usuarios',authenticateToken,getUsuarios)
router.post('/usuarios',registroUsuarios)
router.post('/login',login)


router.get("*", notFound);



export default router
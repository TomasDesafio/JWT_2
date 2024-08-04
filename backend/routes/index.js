import { Router } from 'express'

import express from 'express'
import { login, registroUsuarios,getUsuarios,notFound,home } from '../controllers/index.js'

const router = express.Router()


router.get("/", home);
//router.get('/usuarios',getUsuarios)

router.get('/usuarios',getUsuarios)
router.post('/usuarios',registroUsuarios)
router.post('/login',login)


router.get("*", notFound);



export default router
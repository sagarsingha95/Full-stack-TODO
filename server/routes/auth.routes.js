import express from 'express'
import { register, login, googleLogin } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', googleLogin)

export default router
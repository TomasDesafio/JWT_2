import jwt from 'jsonwebtoken'
import { JWT_SECRETA } from '../config/index.js'

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return res.status(401).json({ message: 'Token no proporcionado' })

    jwt.verify(token, JWT_SECRETA, (err, user) => {
        if (err) {
            console.log('Error en la verificación del token:', err.message)
            return res.status(403).json({ message: 'Token inválido' })
        }

        req.user = user
        next()
    })
}


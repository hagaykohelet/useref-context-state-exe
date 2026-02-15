import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY

export function createToken(username, password) {
    return jwt.sign({ name: username, passworrd: password }, secretKey, { expiresIn: '1h' })
}


export function verifyToken(token) {
    return jwt.verify(token, secretKey)
}

import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secretKey = process.env.SECRET_KEY

export function createToken(username, id) {
    return jwt.sign({ name: username, id: id }, secretKey, { expiresIn: '1h' })
}


export function verifyToken(token) {
    return jwt.verify(token, secretKey, (err, success) => {
        if (err) {
            return false
        }
        return success
    })
}


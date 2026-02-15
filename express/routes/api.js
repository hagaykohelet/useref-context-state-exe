import express from "express"
import { createToken, verifyToken } from "../utils/token"
const apiRoute = express()

apiRoute.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const token = createToken(username, password)
        res.json({ token: token, 
            operator: { name: username, id: id, role: role } })
    }
    catch (err) {
        res.send(String(err))
    }
})

apiRoute.get('/status', async (req, res) => {
    try {
        const { token } = req.body
        res.send()
    }
    catch (err) {
        res.send(String(err))
    }
})




export default apiRoute
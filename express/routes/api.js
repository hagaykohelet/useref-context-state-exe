import express from "express"
import { createToken, verifyToken } from "../utils/token.js"
import { read } from '../utils/readData.js'
const apiRoute = express()

apiRoute.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const data = await read(username, password)
        if (data) {
            const token = createToken(username, data.id)
            res.json({
                token: token,
                operator: { name: username, id: data.id, role: data.role }
            })
        }
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
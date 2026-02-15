import express from "express"
import { createToken, verifyToken } from "../utils/token.js"
import { read, writeMessage } from '../utils/readData.js'
const apiRoute = express()

apiRoute.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const data = await read()
        for (let user of data) {
            if (user.name === username && user.password === password) {
                const token = createToken(username, user.id)
                return res.json({
                    token: token,
                    operator: { name: username, id: data.id, role: data.role }
                })
            }
        }

        res.json({ msg: "this name not found" })

    }
    catch (err) {
        res.send(String(err))
    }
})

apiRoute.get('/status', async (req, res) => {
    try {
        const token = req.headers.token
        res.send(verifyToken(token))

    }
    catch (err) {
        res.send(String(err))
    }
})


apiRoute.get('/messages', async (req, res) => {
    try {
        const token = req.headers.token
        if (!token) {
            return res.json({ msg: "you need token" })
        }
        const verify = verifyToken(token)
        const data = await read()
        for (let user of data) {
            if (user.id === verify.id && user.name === verify.name) {
                return res.send(user.messages)
            }
        }
        return res.json({ message: "not found!" })

    }
    catch (err) {
        return res.json({ msg: String(err) })
    }
})

apiRoute.post('/messages', async (req, res) => {
    try {
        const token = req.headers.token
        const verify = verifyToken(token)
        const newMessage = req.body.text
        const writeToFile = await writeMessage(newMessage, verify.id ,verify.name)
        if(!writeToFile){
            return res.send("fail to write")
        }
        return res.send('success')
    } catch (err) {
        return res.send(String(err))
    }
})

export default apiRoute
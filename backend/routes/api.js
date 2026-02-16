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
                    operator: { name: username, id: user.id, role: user.role }
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
        const auth = verifyToken(token)
        if (auth) {
            return res.send({
                checkpoint: "allowed",
                isOpen: true,
                trafficLevel: "normal",
                lastUpdated: new Date().toISOString()
            })
        }
        return res.send("this token not verify!")
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
        if (!verify) {
            return res.send("this token not verify!")
        }
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
        if (!verify) {
            return res.send("this token not verify!")
        }
        const newMessage = req.body.text
        const writeToFile = await writeMessage(newMessage, verify.id, verify.name)
        if (!writeToFile) {
            return res.send("fail to write")
        }
        return res.send('success')
    } catch (err) {
        return res.send(String(err))
    }
})

export default apiRoute
import express from "express"
import apiRoute from "./routes/api.js"
const app = express()
app.use(express.json())
app.use("/api", apiRoute)
const PORT = 3000

app.listen(PORT, () => {
    console.log('server run....');
})
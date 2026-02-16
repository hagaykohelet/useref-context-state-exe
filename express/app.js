import express from "express"
import apiRoute from "./routes/api.js"
import cors from "cors"
const app = express()
app.use(express.json())

app.use(cors())

app.use("/api", apiRoute)

const PORT = 3000

app.listen(PORT, () => {
    console.log('server run....');
})

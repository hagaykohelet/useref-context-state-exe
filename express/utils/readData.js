import fs from 'fs/promises'
export async function read(username, password) {
    const res = await fs.readFile('db/data.json', "utf-8")
    const data = JSON.parse(res)
    for (let user of data) {
        if (username === user.name && password === user.password) {
            return user
        }
    }
    return false
}


export async function write() {
    pass
}
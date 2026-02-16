import fs from 'fs/promises'
export async function read() {
    const res = await fs.readFile('./db/data.json', "utf-8")
    const data = JSON.parse(res)
    return data
}



export async function writeMessage(message, id, name) {
    try {
        const res = await fs.readFile('./db/data.json', "utf-8")
        const data = JSON.parse(res)
        data.forEach(element => {
            if (element.id === id && element.name === name) {
                element.messages.push(message)
            }
        })
        await fs.writeFile('./db/data.json' ,JSON.stringify(data, null,2))
        return true
    }catch(err){
        return false
    }
    
}



import { useRef, useState } from "react"

function CommsPanel() {
    const [newMsgFlag, setNewMsg] = useState(false)
    const newMessage = useRef("")
    async function send(){
        const token = localStorage.getItem("token")
        const message = newMessage.current?.value;
         const res = await fetch("http://localhost:3000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token:token
            },
            body: JSON.stringify({text:message})
        })
        setNewMsg(true)
        console.log(res);
        // const data = await res.json(res)
    }
    return (
        <>
        <input type="text" placeholder="enter your message" ref={newMessage}/>
        <button onClick={send}>send new message</button>
        {newMsgFlag && <p>new Message added</p>}
        </>
    )
}

export default CommsPanel
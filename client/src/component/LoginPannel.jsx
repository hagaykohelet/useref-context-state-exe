import { useState } from "react"

function LoginPannel() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    function handleUser(e) {
        setUser({ ...user, username: e.target.value })
    }
    function handlePassword(e) {
        setUser({ ...user, password: e.target.value })
    }

    async function getUser() {
        const res = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        const data = await res.json(res)
        localStorage.setItem("token", data.token)
    }   
    return (
        <div>
            <input type="text" onChange={handleUser} placeholder='user name' />
            <input type="text" onChange={handlePassword} placeholder='password' />
            <button onClick={getUser}>login</button>
        </div>
    )
}

export default LoginPannel
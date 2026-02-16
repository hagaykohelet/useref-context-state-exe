import { useContext, useState } from "react"
import { UserContext } from "../App"

function StatusCard() {
    const {info, setInfo} = useContext(UserContext)
    const [show, setShow] = useState(false);
    const token = localStorage.getItem("token")
     async function getStatusCard() {
        const res = await fetch("http://localhost:3000/api/status", {
            method: "GET",
            headers: {
                token:token
            },
        })
        const data = await res.json(res)
        setInfo(data)
        setShow(true)
    }
    return (
        <div>
            <button onClick={getStatusCard}>get info</button>
            {show && <div className="asd">
            <p>checkpoint:{info.checkpoint}</p>
            <p>isOpen:{info.isOpen? <span>true</span>:<span>false</span>}</p>
            <p>trafficLevel:{info.trafficLevel}</p>
            <p>lastUpdated:{info.lastUpdated}</p>
            <button onClick={getStatusCard}>refersh</button>
            </div>}
        </div>
    )
}

export default StatusCard
import { createContext, useState } from 'react'
import './App.css'
import LoginPannel from './component/LoginPannel'
import Navbar from './component/navbar'
import StatusCard from './component/StatusCard'
import CommsPanel from './component/CommsPanel'
const UserContext = createContext()

function App() {
  const [color, setColor] = useState("white")
  const [info, setInfo] = useState({})
  return (
    <div className={color}>
      <UserContext value={{ color, setColor, info, setInfo }}>
        <Navbar />
        <LoginPannel />
        <StatusCard />
        <CommsPanel />
      </UserContext>
    </div>

  )
}

export { App, UserContext }

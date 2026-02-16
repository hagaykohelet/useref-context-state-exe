import { useContext } from "react"
import { UserContext } from "../App"

function Navbar() {
    const { color, setColor } = useContext(UserContext)
    function changeColor() {
        if (color === "white") {
            setColor("black")
        }
        else {
            setColor("white")
        }
    }
    return (
        <button onClick={changeColor}>change color</button>
    )
}

export default Navbar
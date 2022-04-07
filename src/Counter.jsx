import { useEffect, useState } from "react"

const Counter = () => {
    const [c,setC] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setC(v => v + 1)
        }, 500);
    }, [])
    return <p>{c}</p>
}

export default Counter
import { useState, createContext } from "react";

const StateToolContext = createContext()

function StateToolProvider ({ children }) {
    const [ addedData, setAddedData ] = useState("")
    const [ stateTool, setStateTool ] = useState('hidden')
    

    const handleStateTool = () => {
        setStateTool(stateTool === 'active' ? 'hidden' : 'active' )
        console.log("stateTool")
    }

    const value = {
        addedData, setAddedData,
        stateTool, setStateTool,
        handleStateTool
    }
    return (
        <StateToolContext.Provider value={value}>
            {children}
        </StateToolContext.Provider>
    )
}

export { StateToolContext, StateToolProvider}
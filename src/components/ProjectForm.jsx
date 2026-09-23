import { useState} from "react"

export default function ProjectForm ({ addProject , onClose }) {

    const [projectName, setProjectName] = useState("")
    const [clientName , setClientName] = useState("")
      
    function handleSubmit(event) {
        event.preventDefault()
        if(!projectName.trim()){
            return 

            
            }

            addProject(projectName, clientName)
             setProjectName("")
             setClientName("")
             onClose()
        
    }

    return (
    <form className= "project-form" onSubmit={handleSubmit}>
        <h2>Create new project</h2>
        <label htmlFor ="projectName">Project name:</label>
        <input
         type="text" 
         id="projectName" 
         placeholder="Enter project name" 
         value = {projectName}
         onChange= {(event) => setProjectName(event.target.value)}
        />
        <label htmlFor= "clientName">Client name</label>

        <input
        id="clientName"
        type="text"
        placeholder="Enter client name"
        value= {clientName}
        onChange={(event) => setClientName(event.target.value)}
        />
        <button type="submit">Create project</button>
    </form>
)}
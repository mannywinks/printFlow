import { useState} from "react"
import ProjectForm from "./ProjectForm"

export default function Header( {addProject}) {

    const [showProjectForm, setShowProjectForm] = useState(false);
     
      
  
    return (
        <header className="topbar">
            
                <h1>PrintFlow</h1>
                <button className = "new-project-btn"
                onClick={() => setShowProjectForm(prevValue => !prevValue)}>
                    {showProjectForm ? "Close Form" : "New Project"}
                </button>
                {showProjectForm && (
                    <ProjectForm 
                    addProject={addProject} 
                    onClose={() => setShowProjectForm(false)}/>
                )}
            
        </header>
    )
}
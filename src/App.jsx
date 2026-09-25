import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { useState , useEffect } from "react"
function App() {

  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects")

    return savedProjects ? JSON.parse(savedProjects) : []
  })
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])


   function addProject(projectName, clientName) {

       const newProject = {
        id: Date.now(),
        name: projectName,
        client: clientName || "Not assigned",
        status: "Active"
       }
    setProjects(prevProjects => [...prevProjects, newProject])

   }


    function deleteProject(projectId){
      setProjects(previousProjects => 
        previousProjects.filter(project => project.id !== projectId)
      )
    }


     function completeProject(projectId) {
       setProjects(previousProjects => 
        previousProjects.map(project => 
          project.id === projectId ?
          {...project, status: "Completed"}
           : project
        )
       )
     } function editProject(projectId, newName){
       setProjects(previousProjects =>
        previousProjects.map(project => 
          project.id === projectId
          ? { ...project,name: newName}
          : project
     )
       )
     }

  return (
    <div className = "app-layout">
     
      <Sidebar />

      <div className="content-area">
        <Header addProject={addProject} />
        <Dashboard  projects={projects} 
        deleteProject={deleteProject}
        completeProject={completeProject}
        editProject= {editProject}
        />
      </div>
    
    </div>
  ) 
}

export default App
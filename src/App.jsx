import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { useState , useEffect } from "react"
import Clients from "./components/Clients"

function App() {
  
   const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem("clients")

    return savedClients ? JSON.parse(savedClients) : []
   })
  const [ activePage , setActivePage] = useState("Dashboard")
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects")
    
    
    return savedProjects ? JSON.parse(savedProjects) : []
  })
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients))
  }, [clients])


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

     function addClient(clientName, clientEmail) {
       const newClient = {
        id: Date.now(),
        name: clientName,
        email: clientEmail
       }
         setClients(previousClients => [
        ...previousClients, newClient
       ])
     }
      function editClient(clientId, newName) {
        setClients(previousClients => 
          previousClients.map(client =>
            client.id === clientId 
            ? {...client, name : newName} : client
          )
        )
      }
     function deleteClient(clientId) {
      setClients(previousClients => 
        previousClients.filter(client => client.id !== clientId )
      )
     }

  return (
    <div className = "app-layout">
     
      <Sidebar 
         activePage = {activePage}
         setActivePage= {setActivePage}/>

      <div className="content-area">
        <Header addProject={addProject} />
        {activePage === "Dashboard" ? (
        <Dashboard  
        projects={projects} 
        deleteProject={deleteProject}
        completeProject={completeProject}
        editProject= {editProject}
        />
        ) : activePage ==="Clients" ? (
          <Clients 
          clients= {clients}
          addClient={addClient}
          deleteClient = {deleteClient}
          editClient= {editClient}/> ) : (
          <main className='dashboard'>
            <h1>{activePage}</h1>
            <p>This page willl be built next.</p>
          </main>
        )}
      </div>
    
    </div>
  ) 
}

export default App
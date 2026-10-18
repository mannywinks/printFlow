import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { useState , useEffect } from "react"
import Clients from "./components/Clients"
import Quotes from  './components/Quotes'
import Settings from "./components/Settings"

function App() {
  
   const [ quotes, setQuotes] = useState(() => {
     const savedQuotes = localStorage.getItem("quotes")

     return savedQuotes ? JSON.parse(savedQuotes) : []
   })
   const [clients, setClients] = useState(() => {
    const savedClients = localStorage.getItem("clients")

    return savedClients ? JSON.parse(savedClients) : []
   })
 
 
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects")
    return savedProjects ? JSON.parse(savedProjects) : []
  })
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("settings")

    return savedSettings ? JSON.parse(savedSettings) :
     { 
       businessName : "",
       email: ""
     }
  })

   const [ activePage , setActivePage] = useState("Dashboard")
   const [sidebarOpen, setSidebarOpen] = useState(false)

    const activeProjects = projects.filter(
    project => project.status === "Active"
  ).length

  const completedProjects = projects.filter(
    project => project.status === "Completed"
  ).length

  const pendingQuotes = quotes.filter(
    quote => quote.status === "Pending"
  ).length

  const approvedQuoteValue = quotes
    .filter(quote => quote.status === "Approved")
    .reduce((total, quote) => total + quote.amount, 0)



  
  useEffect(() => {localStorage.setItem( "settings",
    JSON.stringify(settings)
  )
}, [settings])
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])
  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients))
  }, [clients])
  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes))

  }, [quotes])


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

     function addQuote(clientName, amount) {
       const newQuote = {
          id: Date.now(),
          client: clientName,
          amount: Number(amount),
          status: "Pending"
        }
        setQuotes(previousQuotes => [
          ...previousQuotes , newQuote
        ])

       }

       function updateQuoteStatus(quoteId, newStatus) {
        setQuotes(previousQuotes =>
          previousQuotes.map(quote =>
            quote.id === quoteId 
            ? { ...quote, status: newStatus } 
            : quote 
          )
        )
       }

       function editQuote(quoteId, updatedClient, updatedAmount) {
         setQuotes(previousQuotes => 
          previousQuotes.map(quote =>
            quote.id === quoteId 
            ? {
              ...quote,
              client: updatedClient, 
              amount: Number(updatedAmount)
            }
            : quote
          )
         )
       }

       function deleteQuote(quoteId) {
        setQuotes(previousQuotes => 
          previousQuotes.filter(quote => quote.id !== quoteId)
        )
       }
     

  return (
    <div className = "app-layout">

      <button
       className ="menu-button"
       onClick={() => 
        setSidebarOpen(previousValue => !previousValue)}
      >
       ☰

    </button>
    
      <Sidebar 
         activePage = {activePage}
         setActivePage= {setActivePage}
         sidebarOpen ={sidebarOpen}
         setSidebarOpen ={setSidebarOpen}/>

      <div className="content-area">
        <Header addProject={addProject} />
        {activePage === "Dashboard" ? (
        <Dashboard  
        projects={projects} 
        deleteProject={deleteProject}
        completeProject={completeProject}
        editProject= {editProject}
        activeProjects={activeProjects}
        completedProjects={completedProjects}
        pendingQuotes={pendingQuotes}
        approvedQuoteValue={approvedQuoteValue}
        />
        ) : activePage ==="Clients" ? (
          <Clients 
          clients= {clients}
          addClient={addClient}
          deleteClient = {deleteClient}
          editClient= {editClient}/> ) : 
          activePage === "Quotes" ? (
            <Quotes 
             quotes= {quotes}
             addQuote= {addQuote}
             deleteQuote= {deleteQuote}
             updateQuoteStatus= {updateQuoteStatus}
             editQuote= {editQuote}
             /> ) : activePage === "Settings" ? (
          <Settings 
             settings={settings}
             setSettings={setSettings}/>
        ) : (
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
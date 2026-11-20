import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import { useState , useEffect } from "react"
import Clients from "./components/Clients"
import Quotes from  './components/Quotes'
import Settings from "./components/Settings"



function App() {
  

   const API_URL = import.meta.env.VITE_API_URL;
   
   const [ quotes, setQuotes] = useState([]);
   const [clients, setClients] = useState([]);
 

  
 
  const [projects, setProjects] = useState([]);
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
    async function fetchProjects() {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();

        if( response.ok) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, [API_URL]);

useEffect(() => {
  async function fetchClients() {
    try {
      const response = await fetch(`${API_URL}/api/clients`);
      const data = await response.json();

      if (response.ok) {
        setClients(data.clients);
      }
    } catch (error) {
      console.log("Error fetching clients:", error);
    }
  }

  fetchClients();
}, [API_URL]);

   
useEffect(() => {
  async function fetchQuotes() {
    try {
      const response = await fetch(`${API_URL}/api/quotes`);
      const data = await response.json();

      if (response.ok) {
        setQuotes(data.quotes);
      }
    } catch (error) {
      console.log("Error fetching quotes:", error);
    }
  }

  fetchQuotes();
}, [API_URL]);



   async function addProject(projectName, clientName) {

       const newProject = {
        name: projectName,
        client: clientName || "",
        status: "Active"
       }

              const response = await fetch(`${API_URL}/api/projects`, {
                method: "POST",
                headers: {
                  "Content-Type" : "application/json"
                },
                body: JSON.stringify(newProject)
              });
          
            const data = await response.json();

        if (response.ok) {
          setProjects(prevProjects => [...prevProjects, data.project]);
       } else {
          console.log(data.message);
}

}    


    async function deleteProject(projectId){
      try {
        const response = await fetch(
          `${API_URL}/api/projects/${projectId}`,
          {
            method : "DELETE"
          }
        );

        const data = await response.json();

        if(response.ok){
           setProjects(previousProjects => 
           previousProjects.filter(project => project._id !== projectId)
           );
  
      console.log(data.message);
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log("Error deleting project:", error.message);
  }
}


   async function completeProject(projectId) {
    try {
      const response = await fetch (`http://localhost:5000/api/projects/${projectId}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            status: "Completed"
          })
        });
        const data = await response.json();

        if(response.ok) {
          setProjects(previousProjects => 
            previousProjects.map(project => 
              project._id === projectId
              ? data.project
              : project
            )
          );
        } else {
          console.log(data.message);
        }
    } catch (error) {
      console.log("Error completing project:", error.message);
    }
  }
     
     async function editProject(projectId, newName){
     try {
      const response = await fetch(`${API_URL}/api/projects/${projectId}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            name : newName
          })
        }
      );
      const data = await response.json();

      if(response.ok) {
        setProjects(previousProjects =>
          previousProjects.map(project =>
            project._id === projectId
            ? data.project
             : project
          )
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error updating project:", error);
    }
  }
       

    async function addClient(clientName, clientEmail) {
      try { 
      const newClient = {
        name: clientName,
        email: clientEmail
       };

       const response = await fetch(`${API_URL}/api/clients`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(newClient)
      });

      const data = await response.json();

      if (response.ok) {
        setClients(previousClients => [
          ...previousClients, data.client
        ]);
      } else {
        console.log(data.message);
      }
      }  catch (error) {
        console.log("Error adding client:", error.message);
      } 
    } 
     async  function editClient(clientId, newName) {
      try {
        const response = await fetch(`${API_URL}/api/clients/${clientId}`, {
          method: "PUT",
          headers: {
            "Content-Type" :"application/json"
          },
          body : JSON.stringify({
            name: newName
          })
        });

        const data = await response.json();

        if (response.ok) {
          setClients(previousClients => 
            previousClients.map(client => 
              client._id === clientId ? data.client : client
            )
          );
        }else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("Error updating client:", error.message);
      }
    }
       


     async function deleteClient(clientId) {
  try {
    const response = await fetch(
      `${API_URL}/api/clients/${clientId}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (response.ok) {
      setClients(previousClients =>
        previousClients.filter(client => client._id !== clientId)
      );

      console.log(data.message);
    } else {
      console.log(data.message);
    }
  } catch (error) {
    console.log("Error deleting client:", error);
  }
}

    async function addQuote(clientName, amount) {
      try {
        const newQuote = {
          client: clientName,
          amount: Number(amount),
          status: "Pending"
        };

        const response = await fetch (`${API_URL}/api/quotes`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(newQuote)
        });

        const data = await response.json();

        if (response.ok) {
          setQuotes(previousQuotes => [
            ...previousQuotes , data.quote
          ]);
        } else {
          console.log(data.message);
        }

      } catch (error) {
        console.log("Error adding quote:", error.message);
      }

       }

async function updateQuoteStatus(quoteId, newStatus) {
  try {
    const response = await fetch(
      `${API_URL}/api/quotes/${quoteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      setQuotes(previousQuotes =>
        previousQuotes.map(quote =>
          quote._id === quoteId ? data.quote : quote
        )
      );
    } else {
      console.log(data.message);
    }

  } catch (error) {
    console.log("Error updating quote status:", error);
  }
}


       
async function editQuote(quoteId, updatedClient, updatedAmount) {
  try {
    const response = await fetch(
      `${API_URL}/api/quotes/${quoteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client: updatedClient,
          amount: Number(updatedAmount)
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      setQuotes(previousQuotes =>
        previousQuotes.map(quote =>
          quote._id === quoteId ? data.quote : quote
        )
      );
    } else {
      console.log(data.message);
    }

  } catch (error) {
    console.log("Error updating quote:", error);
  }
}

      
async function deleteQuote(quoteId) {
  try {
    const response = await fetch(
      `${API_URL}/api/quotes/${quoteId}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (response.ok) {
      setQuotes(previousQuotes =>
        previousQuotes.filter(quote => quote._id !== quoteId)
      );

      console.log(data.message);
    } else {
      console.log(data.message);
    }

  } catch (error) {
    console.log("Error deleting quote:", error);
  }
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
        {activePage === "Dashboard" || activePage === "Projects" ? (
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
  );
}
       


export default App;
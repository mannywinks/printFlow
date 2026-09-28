import { useState } from "react"
export default function Clients ({clients,addClient,deleteClient, editClient}) {

    const [ clientName, setClientName] = useState("")
    const [ clientEmail, setClientEmail ] = useState("")     
    

    function handleSubmit(event){
        event.preventDefault()

        if (!clientName.trim() || !clientEmail.trim())return 
       
       addClient(clientName.trim(),clientEmail.trim())
    
        setClientName("")
        setClientEmail("")
    }
     
    function handleEdit(client) {
        const newName = window.prompt(
            "Enter the new client name:",
             client.name

        )
        if(newName && newName.trim()) {
            editClient(client.id, newName.trim())
        }
    }
    
     const clientElements = clients.map(client => (
        <li key ={ client.id}>
            <div classname = "client-details">
                <strong>{client.name}</strong>
                <small>{client.email}</small>
                <button onClick ={() => handleEdit(client)}>Edit</button>
                <button onClick ={() => deleteClient(client.id)}>
                    Delete
                </button>
            </div>
        </li>
     ))
    return (
        <main classname = "dashboard">
            <h1> Clients</h1>
            <p>Manage your clients records</p>
            <form onSubmit = {handleSubmit} className = "client-form">
                <input
                  type="text"
                  placeholder="Client name"
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  />

                 <input
                 type="email"
                 placeholder="Client email"
                 value={clientEmail}
                 onChange={(event) => setClientEmail(event.target.value)}
                />
                 <button type="submit">Add Client</button>
            </form>
            {clients.length === 0 ? (
                <p>No clients yet. Add your first client.</p>
            ) : (
                <ul className = "clent-list">
                    {clientElements}
                </ul>
            )}
        </main>
    )
}
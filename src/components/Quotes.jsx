import { useState } from "react"


export default function Quotes({ quotes, addQuote, deleteQuote, updateQuoteStatus, editQuote }) {
      

    const  [ clientName, setClientName] = useState("")
    const [amount, setAmount] = useState("")
    const [error, setError ] = useState("")
    
    function handleSubmit(event) {
  event.preventDefault()

  if (!clientName.trim()) {
    setError("Please enter a client name.")
    return
  }

  if (Number(amount) <= 0) {
    setError("Please enter a valid amount.")
    return
  }

  addQuote(clientName.trim(), amount)

  setClientName("")
  setAmount("")
  setError("")
}

    function handleEdit(quote) {
        const newClient = window.prompt(
            "Enter client name:",
            quote.client
        )
        
          const newAmount = window.prompt(
             "Enter quote amount:",
               quote.amount
        )
        if (
            newClient &&
            newClient.trim() &&
            Number(newAmount) > 0 

        ) {
            editQuote(quote.id, newClient.trim(), newAmount)
        }
    }
    

    function handleDelete(quoteId) {
  const shouldDelete = window.confirm(
    "Are you sure you want to delete this quote?"
  )

  if (shouldDelete) {
    deleteQuote(quoteId)
  }
}
      
    const quoteElements = quotes.map(quote => (
        <li key ={quote.id}>
            <div className="quote-details">
                <strong>{quote.client}</strong>
                <span>${quote.amount.toLocaleString()}</span>
                <small>{quote.status}</small>
                 <button onClick={() => handleEdit(quote)}>Edit</button>
                <button onClick = {() =>  handleDelete(quote.id)}>Delete</button>
                <select 
                  value= {quote.status}
                  onChange={(event) =>
                    updateQuoteStatus(quote.id, event.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                  
            </div>
        </li>
    ))


    return (

        <main className="dashboard">
            <h1>Quotes</h1>
            <p>Create and manage customer quotes</p>
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={handleSubmit} className = "quote-form">
            <input
            type="text"
            placeholder= "clients name"
            value= {clientName}
            onChange= {(event) => setClientName(event.target.value)}
            />
            <input
              type="number"
              placeholder= "Quote amount"
              value ={amount}
              onChange = {(event) => setAmount(event.target.value)}
              min="1"/>
              <button type="submit"> Create Quote</button>
             
              
                {quotes.length === 0 ? (
                    <p>No quotes yet. Create your first quote.</p>
                ) : ( 
                    <ul className="quote-list">
                        {quoteElements}
              </ul>
                )}
            </form>

        </main>
    )
}
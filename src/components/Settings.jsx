import { useState } from "react"

export default function Settings({ settings, setSettings }) {
 

    const [ formData, setFormData] = useState(settings)
    const [message,setMessage] = useState("")

    function handleChange(event) {
        const { name, value} = event.target

        setFormData(previousData => ({
            ...previousData,
            [name]: value
        }))

        setMessage("")
    }

    function handleSubmit(event) {
        event.preventDefault()

        setSettings(formData)
        setMessage("Settings saved successfully")
    }

 
    return (
    <main className="dashboard">
      <h1>Settings</h1>
      <form
       className="settings-card"
       onSubmit={handleSubmit}
       >
        <h2>Business Information</h2>

        <label>
          Business name
          <input 
            type="text" 
            placeholder="PrintFlow Studio" 
            value={formData.businessName}
            onChange={handleChange}
          />
        </label>

        <label>
          Email address
          <input 
            type="email" 
            placeholder="business@email.com" 
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Save Settings</button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </main>
  )
}
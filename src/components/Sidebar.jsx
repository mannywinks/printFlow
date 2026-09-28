// import { useState} from "react"

export default function Sidebar({activePage, setActivePage}) {

    const menuItems = ["Dashboard", "Projects" , "Clients", "Quotes", "Settings"]
    // const [activeItem, setActiveItem] = useState('Dashboard')
    const menuElements = menuItems.map(item => (
        <button 
            key={item} 
            className={activePage === item ? 'active' : ''}
            onClick={() => setActivePage(item)}
            
        >
            {item}
        </button>
    ))
    return (
        <aside className= "sidebar">
            <h2> Workspace</h2>
            <p>Selected: {activePage}</p>
            <nav>
                {menuElements}
            </nav>
             </aside>
    )
}
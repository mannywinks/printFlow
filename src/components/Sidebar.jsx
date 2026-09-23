import { useState} from "react"

export default function Sidebar() {

    const menuItems = ["Dashboard", "Projects" , "Clients", "Quotes", "Settings"]
    const [activeItem, setActiveItem] = useState('Dashboard')
    const menuElements = menuItems.map(item => (
        <button 
            key={item} 
            className={activeItem === item ? 'active' : ''}
            onClick={() => setActiveItem(item)}
            
        >
            {item}
        </button>
    ))
    return (
        <aside className= "sidebar">
            <h2> Workspace</h2>
            <p>Selected: {activeItem}</p>
            <nav>
                {menuElements}
            </nav>
             </aside>
    )
}
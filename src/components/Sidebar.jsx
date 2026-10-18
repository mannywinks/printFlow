export default function Sidebar({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen
}) {
  const menuItems = [
    "Dashboard",
    "Projects",
    "Clients",
    "Quotes",
    "Settings"
  ]

  function handleNavigation(page) {
    setActivePage(page)
    setSidebarOpen(false)
  }

  const menuElements = menuItems.map(item => (
    <button
      key={item}
      className={activePage === item ? "active" : ""}
      onClick={() => handleNavigation(item)}
    >
      {item}
    </button>
  ))

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <h2>Workspace</h2>
      <p>Selected: {activePage}</p>

      <nav>
        {menuElements}
      </nav>
    </aside>
  )
}
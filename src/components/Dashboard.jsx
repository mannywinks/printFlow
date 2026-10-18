import StatCard from "./StatCard"
import { useState } from "react"

export default function Dashboard( {projects , deleteProject, completeProject, editProject, activeProjects, completedProjects, pendingQuotes, approvedQuoteValue}) {
     
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
     

    function handleEdit(project ){
        const newName = window.prompt(
            "Enter the new project name:",
            project.name
        )

        if(newName && newName.trim()) {
            editProject(project.id,newName.trim())
        }
    }
    const filteredProjects = projects.filter(project => {
         const matchesSearch = project.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase())

  const matchesStatus =
    statusFilter === "All" || project.status ===  statusFilter
  return matchesSearch && matchesStatus
})

    const projectElements = filteredProjects.map((project, index) => (
        
        <li key ={project.id ?? `${project}--${index}`}>
            <div className = "project-details">
                <strong>{project.name}</strong>
                <small>{project.client}</small>
            </div>
            <span className = "project-status">{project.status}</span>
            {project.status === "Active" && (
                <button onClick={() => completeProject(project.id)}>Complete</button>
            )}
            <button onClick={() => handleEdit(project)}>Edit</button>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
        </li>
        
    ))
    return (
        <main className= "dashboard">
        <h1>Business overview</h1>
        <p>Track projects ,clients and revenue</p>
        <section className="stats-grid">
        <StatCard label = "Active projects"
         value={activeProjects} />
        <StatCard label = "completed projects" 
        value={completedProjects} />
        <StatCard label = "Pending quotes"
         value={pendingQuotes} />
        <StatCard label = "Revenue this month" value={approvedQuoteValue}/>
        </section>
        <section className= "projects-section">
            <h2>Recent Projects</h2>
            <section className = "projects-section">
        <input
        className= "project-search"
        type="search"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
        >
            <option value= "All">All projects</option>
            <option value= "Active">Active</option>
            <option value= "Completed">Completed</option>
        </select>
        {searchTerm && filteredProjects.length === 0 && (
            <p>No matching projects found</p>
        )}
         </section>
            {projects.length === 0 ? (
                <p>No projects yet . Create your first project.</p>
            ) : (
                <ul>
                    {projectElements}
                </ul>
            )}
        </section>
        </main>
    )
}
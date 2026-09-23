export default function StatCard(props) {
    return (
        <article className= "stat-card">
            <p>{props.label}</p>
            <h2>{props.value}</h2>
        </article>
    )
}
export default async function ProjectDashboard({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <section>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085" }}>Overview</p>
      <h1 style={{ margin: "8px 0 12px", fontSize: 36 }}>AI HQ Dashboard</h1>
      <p style={{ maxWidth: 700, color: "#667085", lineHeight: 1.6 }}>
        Project <strong>{projectId}</strong> is protected by Supabase authentication and project membership authorization. This dashboard is the foundation for Command Center, Agents, Tasks, Research, Content, and Analytics.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 28 }}>
        {[
          ["Command Center", "Turn an objective into a durable task."],
          ["Agents", "Monitor the future specialist agent network."],
          ["Tasks", "Track objectives and execution state."],
          ["Research", "Store and review research outputs."],
        ].map(([title, description]) => (
          <article key={title} style={{ padding: 20, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 12 }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>{title}</h2>
            <p style={{ margin: 0, color: "#667085", lineHeight: 1.5 }}>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

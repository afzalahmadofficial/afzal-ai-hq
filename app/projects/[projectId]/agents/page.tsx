import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AGENT_REGISTRY } from "@/lib/agents/registry";

export default async function AgentsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: agents, error } = await supabase
    .from("agents")
    .select("id, name, status, agent_type")
    .eq("project_id", projectId)
    .order("name");

  return (
    <section>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085" }}>Orchestration</p>
      <h1 style={{ margin: "8px 0 12px", fontSize: 36 }}>Agents</h1>
      <p style={{ maxWidth: 720, color: "#667085", lineHeight: 1.6 }}>The registry defines AI HQ capabilities while the database provides project-scoped runtime agents.</p>

      {error ? <p style={{ marginTop: 24, color: "#b42318" }}>{error.message}</p> : null}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16, marginTop: 28 }}>
        {AGENT_REGISTRY.map((definition) => (
          <article key={definition.key} style={{ padding: 20, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>{definition.name}</h2>
              <span style={{ fontSize: 12, fontWeight: 700 }}>{definition.status}</span>
            </div>
            <p style={{ color: "#667085", lineHeight: 1.5 }}>{definition.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {definition.capabilities.map((capability) => <span key={capability} style={{ padding: "5px 8px", background: "#eef2f6", borderRadius: 999, fontSize: 12 }}>{capability}</span>)}
            </div>
          </article>
        ))}
      </div>

      <h2 style={{ marginTop: 36 }}>Project Runtime Agents</h2>
      {!agents?.length ? (
        <p style={{ color: "#667085" }}>No project runtime agents are registered yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
          {agents.map((agent) => (
            <article key={agent.id} style={{ padding: 16, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 10 }}>
              <strong>{agent.name}</strong>
              <span style={{ marginLeft: 12, color: "#667085", fontSize: 13 }}>{agent.agent_type} · {agent.status}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

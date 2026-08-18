import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ActivityPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: events, error } = await supabase
    .from("system_events")
    .select("id, event_type, severity, actor_type, entity_type, entity_id, payload, created_at")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <section>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085" }}>Audit</p>
      <h1 style={{ margin: "8px 0 12px", fontSize: 36 }}>Activity</h1>
      <p style={{ color: "#667085", lineHeight: 1.6 }}>Project-scoped system events and agent activity.</p>
      {error ? <p style={{ marginTop: 24, color: "#b42318" }}>{error.message}</p> : !events?.length ? (
        <div style={{ marginTop: 24, padding: 28, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>No activity yet</h2>
          <p style={{ marginBottom: 0, color: "#667085" }}>Execution events will appear here as the orchestration layer emits audit records.</p>
        </div>
      ) : (
        <div style={{ marginTop: 24, display: "grid", gap: 10 }}>
          {events.map((event) => (
            <article key={event.id} style={{ padding: 16, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <strong>{event.event_type}</strong>
                <time style={{ color: "#667085", fontSize: 12 }}>{new Date(event.created_at).toLocaleString()}</time>
              </div>
              <p style={{ margin: "8px 0 0", color: "#667085", fontSize: 13 }}>{event.severity} · {event.actor_type} · {event.entity_type ?? "system"}</p>
              {event.entity_id && <p style={{ margin: "6px 0 0", fontSize: 12, color: "#98a2b3" }}>Entity: {event.entity_id}</p>}
              <pre style={{ margin: "10px 0 0", whiteSpace: "pre-wrap", color: "#475467", fontSize: 12 }}>{JSON.stringify(event.payload, null, 2)}</pre>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

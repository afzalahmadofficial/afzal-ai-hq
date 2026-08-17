import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function TaskDetailPage({ params }: { params: Promise<{ projectId: string; taskId: string }> }) {
  const { projectId, taskId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: task, error } = await supabase
    .from("agent_tasks")
    .select("id, project_id, title, status, agent_id, created_at, updated_at, result")
    .eq("id", taskId)
    .eq("project_id", projectId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!task) notFound();

  return (
    <section style={{ maxWidth: 900 }}>
      <Link href={`/projects/${projectId}/tasks`} style={{ color: "#667085", fontSize: 14 }}>← Back to Tasks</Link>
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", gap: 20, alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085" }}>Task Detail</p>
          <h1 style={{ margin: "8px 0 12px", fontSize: 36 }}>{task.title}</h1>
        </div>
        <span style={{ padding: "7px 12px", borderRadius: 999, background: "#eef2f6", fontSize: 13, fontWeight: 700 }}>{task.status}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 24 }}>
        <Info label="Task ID" value={task.id} />
        <Info label="Project ID" value={task.project_id} />
        <Info label="Agent" value={task.agent_id ?? "Not assigned"} />
        <Info label="Created" value={new Date(task.created_at).toLocaleString()} />
        <Info label="Updated" value={new Date(task.updated_at).toLocaleString()} />
      </div>

      <article style={{ marginTop: 20, padding: 24, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 12 }}>
        <h2 style={{ marginTop: 0 }}>Execution Result</h2>
        {task.result ? (
          <pre style={{ whiteSpace: "pre-wrap", overflowX: "auto", margin: 0, color: "#475467" }}>{JSON.stringify(task.result, null, 2)}</pre>
        ) : (
          <p style={{ marginBottom: 0, color: "#667085" }}>No execution result yet. Agent orchestration will populate this area in the next milestone.</p>
        )}
      </article>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: 16, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 10 }}>
      <p style={{ margin: 0, fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#667085" }}>{label}</p>
      <p style={{ margin: "7px 0 0", wordBreak: "break-word" }}>{value}</p>
    </div>
  );
}

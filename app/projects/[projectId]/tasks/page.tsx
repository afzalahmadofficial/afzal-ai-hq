import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function TasksPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: tasks, error } = await supabase
    .from("agent_tasks")
    .select("id, task_type, status, priority, agent_id, created_at, updated_at")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  return <section><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}><div><p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085" }}>Execution</p><h1 style={{ margin: "8px 0 8px", fontSize: 36 }}>Tasks</h1><p style={{ margin: 0, color: "#667085" }}>Project-scoped agent execution tasks.</p></div><Link href={`/projects/${projectId}/command`} style={{ padding: "11px 16px", borderRadius: 9, background: "#172033", color: "#fff" }}>New Task</Link></div>{error ? <div style={{ marginTop: 28, padding: 20, background: "#fff", border: "1px solid #fecdca", borderRadius: 12 }}><strong>Unable to load tasks.</strong><p style={{ marginBottom: 0, color: "#667085" }}>{error.message}</p></div> : !tasks?.length ? <div style={{ marginTop: 28, padding: 32, textAlign: "center", background: "#fff", border: "1px solid #e5e9f0", borderRadius: 12 }}><h2 style={{ marginTop: 0 }}>No tasks yet</h2><p style={{ color: "#667085" }}>Create your first objective from the Command Center.</p><Link href={`/projects/${projectId}/command`} style={{ display: "inline-block", marginTop: 8, padding: "10px 14px", borderRadius: 8, background: "#eef2f6" }}>Open Command Center</Link></div> : <div style={{ display: "grid", gap: 10, marginTop: 28 }}>{tasks.map((task) => <Link key={task.id} href={`/projects/${projectId}/tasks/${task.id}`} style={{ textDecoration: "none", color: "inherit" }}><article style={{ padding: 18, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 12 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}><div><h2 style={{ margin: 0, fontSize: 17 }}>{task.task_type}</h2><p style={{ margin: "7px 0 0", fontSize: 13, color: "#667085" }}>Agent: {task.agent_id ?? "Unassigned"} · Priority: {task.priority}</p></div><span style={{ alignSelf: "flex-start", padding: "5px 9px", borderRadius: 999, background: "#eef2f6", fontSize: 12, fontWeight: 700 }}>{task.status}</span></div></article></Link>)}</div>}</section>;
}

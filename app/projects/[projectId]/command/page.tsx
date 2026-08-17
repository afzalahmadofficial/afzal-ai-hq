"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function CommandCenterPage({ params }: { params: Promise<{ projectId: string }> }) {
  const [projectId, setProjectId] = useState<string>("");
  const [objective, setObjective] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Next.js supplies the route params asynchronously; the hidden project field is
  // populated from the URL when the page mounts in the browser.
  void params.then(({ projectId: id }) => setProjectId((current) => current || id));

  async function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!objective.trim() || !projectId) return;

    setLoading(true);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data, error } = await supabase
        .from("agent_tasks")
        .insert({ project_id: projectId, title: objective.trim(), status: "queued" })
        .select("id")
        .single();

      if (error) throw error;

      setObjective("");
      setMessage(`Task created successfully: ${data.id}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create task.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ maxWidth: 760 }}>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085" }}>Command Center</p>
      <h1 style={{ margin: "8px 0 12px", fontSize: 36 }}>What should AI HQ do?</h1>
      <p style={{ color: "#667085", lineHeight: 1.6 }}>Submit an objective. The objective becomes a durable, project-scoped task that the agent orchestration layer can execute later.</p>

      <form onSubmit={createTask} style={{ marginTop: 28, padding: 24, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 14 }}>
        <label style={{ display: "grid", gap: 10 }}>
          <span style={{ fontWeight: 600 }}>Objective</span>
          <textarea required minLength={3} value={objective} onChange={(event) => setObjective(event.target.value)} placeholder="Example: Research the latest AI automation trends and prepare a concise LinkedIn brief." rows={7} style={{ width: "100%", resize: "vertical", padding: 14, border: "1px solid #d0d5dd", borderRadius: 10 }} />
        </label>
        {message && <p role="status" style={{ margin: "16px 0 0", color: "#344054" }}>{message}</p>}
        <button disabled={loading || !projectId} type="submit" style={{ marginTop: 16, padding: "12px 18px", border: 0, borderRadius: 9, background: "#172033", color: "#fff", cursor: loading ? "wait" : "pointer" }}>
          {loading ? "Creating task…" : "Create Task"}
        </button>
      </form>
    </section>
  );
}

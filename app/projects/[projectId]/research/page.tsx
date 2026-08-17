import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ResearchPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: records, error } = await supabase
    .from("research")
    .select("id, title, status, created_at, updated_at")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  return (
    <section>
      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#667085" }}>Intelligence</p>
      <h1 style={{ margin: "8px 0 12px", fontSize: 36 }}>Research</h1>
      <p style={{ maxWidth: 720, color: "#667085", lineHeight: 1.6 }}>
        Research outputs will be project-scoped and governed by the existing Supabase membership policies.
      </p>

      {error ? (
        <div style={{ marginTop: 24, padding: 20, background: "#fff", border: "1px solid #fecdca", borderRadius: 12 }}>
          <strong>Unable to load research.</strong>
          <p style={{ marginBottom: 0, color: "#667085" }}>{error.message}</p>
        </div>
      ) : !records?.length ? (
        <div style={{ marginTop: 24, padding: 28, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 12 }}>
          <h2 style={{ marginTop: 0 }}>No research records yet</h2>
          <p style={{ color: "#667085" }}>The Research Agent foundation is ready. Execution and source ingestion will be connected next.</p>
          <Link href={`/projects/${projectId}/command`} style={{ display: "inline-block", marginTop: 8, padding: "10px 14px", borderRadius: 8, background: "#eef2f6" }}>Create a research objective</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10, marginTop: 24 }}>
          {records.map((record) => (
            <article key={record.id} style={{ padding: 18, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <strong>{record.title}</strong>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{record.status}</span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: "#667085" }}>{new Date(record.created_at).toLocaleString()}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

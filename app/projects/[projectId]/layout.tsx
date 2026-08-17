import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProjectLayout({ children, params }: { children: React.ReactNode; params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: membership } = await supabase
    .from("project_members")
    .select("project_id, role, status")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!membership) redirect("/projects");

  const links = [
    ["Overview", ""],
    ["Command Center", "/command"],
    ["Agents", "/agents"],
    ["Tasks", "/tasks"],
    ["Research", "/research"],
    ["Content", "/content"],
    ["Approvals", "/approvals"],
    ["Reports", "/reports"],
    ["Analytics", "/analytics"],
    ["Memory", "/memory"],
    ["Activity", "/activity"],
    ["Settings", "/settings"],
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f7f9fc" }}>
      <aside style={{ width: 240, padding: 24, background: "#fff", borderRight: "1px solid #e5e9f0" }}>
        <strong>Afzal Ahmad AI HQ</strong>
        <p style={{ fontSize: 13, color: "#667085" }}>Role: {membership.role}</p>
        <nav style={{ display: "grid", gap: 6, marginTop: 24 }}>
          {links.map(([label, path]) => (
            <Link key={label} href={`/projects/${projectId}${path}`} style={{ padding: "9px 10px", borderRadius: 8 }}>{label}</Link>
          ))}
        </nav>
      </aside>
      <section style={{ flex: 1, minWidth: 0 }}>
        <header style={{ height: 68, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderBottom: "1px solid #e5e9f0" }}>
          <span>Project: {projectId}</span>
          <span style={{ fontSize: 13, color: "#667085" }}>{user.email}</span>
        </header>
        <main style={{ padding: 32 }}>{children}</main>
      </section>
    </div>
  );
}

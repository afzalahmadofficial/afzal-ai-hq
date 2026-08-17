import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProjectMemberships } from "@/lib/projects/get-project-memberships";
import { ProjectSelector } from "./ProjectSelector";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const projects = await getProjectMemberships();

  return (
    <main style={{ minHeight: "100vh", padding: 40 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{ margin: 0, color: "#667085" }}>Signed in as {user.email}</p>
        <h1 style={{ margin: "8px 0 28px" }}>Select a project</h1>
        <ProjectSelector projects={projects} />
      </div>
    </main>
  );
}

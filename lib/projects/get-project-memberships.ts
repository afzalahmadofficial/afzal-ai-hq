import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProjectMembership } from "./types";

export async function getProjectMemberships(): Promise<ProjectMembership[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("project_members")
    .select("project_id, role, status, projects!inner(name, status)")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Unable to load project memberships: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const project = Array.isArray(row.projects) ? row.projects[0] : row.projects;

    return {
      project_id: row.project_id,
      project_name: project?.name ?? "Unnamed project",
      project_status: project?.status ?? "active",
      role: row.role,
      membership_status: row.status,
    } as ProjectMembership;
  });
}

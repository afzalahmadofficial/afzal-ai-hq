export type ProjectRole = "owner" | "admin" | "operator" | "member";
export type ProjectStatus = "active" | "archived";

export interface ProjectMembership {
  project_id: string;
  project_name: string;
  project_status: ProjectStatus;
  role: ProjectRole;
  membership_status: string;
}

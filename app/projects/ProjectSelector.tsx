"use client";

import type { ProjectMembership } from "@/lib/projects/types";

interface ProjectSelectorProps {
  projects: ProjectMembership[];
}

export function ProjectSelector({ projects }: ProjectSelectorProps) {
  if (projects.length === 0) {
    return (
      <section style={{ padding: 24, border: "1px solid #e5e9f0", borderRadius: 12, background: "#fff" }}>
        <h2 style={{ marginTop: 0 }}>No projects available</h2>
        <p style={{ marginBottom: 0, color: "#667085" }}>
          Your account does not currently have an active project membership.
        </p>
      </section>
    );
  }

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <h2 style={{ margin: 0 }}>Your projects</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {projects.map((project) => (
          <a
            key={project.project_id}
            href={`/projects/${project.project_id}`}
            style={{ padding: 20, border: "1px solid #e5e9f0", borderRadius: 12, background: "#fff" }}
          >
            <strong>{project.project_name}</strong>
            <div style={{ marginTop: 6, color: "#667085", fontSize: 14 }}>
              {project.role} · {project.project_status}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

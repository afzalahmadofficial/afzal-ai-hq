export type AgentKey = "ceo" | "research" | "content" | "analytics";

export interface AgentRoute {
  agent: AgentKey;
  reason: string;
  priority: "low" | "normal" | "high";
}

export interface AgentPlan {
  taskId: string;
  projectId: string;
  objective: string;
  route: AgentRoute;
  steps: string[];
}

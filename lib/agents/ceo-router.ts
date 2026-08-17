import type { AgentKey, AgentPlan, AgentRoute } from "@/lib/agents/types";

function classifyObjective(objective: string): AgentRoute {
  const text = objective.toLowerCase();

  if (/research|investigate|analy[sz]e|study|competitor|trend|source|market/.test(text)) {
    return { agent: "research", reason: "Objective contains research or intelligence-oriented work.", priority: "normal" };
  }

  if (/content|write|article|linkedin|post|script|newsletter|copy/.test(text)) {
    return { agent: "content", reason: "Objective contains content-generation work.", priority: "normal" };
  }

  if (/analytics|metric|dashboard|performance|report|kpi/.test(text)) {
    return { agent: "analytics", reason: "Objective contains analytics or reporting work.", priority: "normal" };
  }

  return { agent: "ceo", reason: "No specialist route matched; CEO agent retains orchestration responsibility.", priority: "normal" };
}

export function createAgentPlan(input: {
  taskId: string;
  projectId: string;
  objective: string;
}): AgentPlan {
  const objective = input.objective.trim();
  const route = classifyObjective(objective);

  return {
    taskId: input.taskId,
    projectId: input.projectId,
    objective,
    route,
    steps: [
      "Validate task ownership and project scope.",
      `Route objective to the ${route.agent} agent.`,
      "Execute the specialist workflow in a server-side boundary.",
      "Persist execution state and result.",
      "Expose the result through the task detail view.",
    ],
  };
}

export function supportedAgents(): AgentKey[] {
  return ["ceo", "research", "content", "analytics"];
}

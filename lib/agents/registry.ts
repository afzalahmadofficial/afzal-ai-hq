import type { AgentKey } from "./types";

export interface AgentDefinition {
  key: AgentKey;
  name: string;
  description: string;
  capabilities: string[];
  status: "active" | "planned";
}

export const AGENT_REGISTRY: AgentDefinition[] = [
  { key: "ceo", name: "CEO / Router", description: "Owns orchestration, prioritization, and specialist routing.", capabilities: ["Task triage", "Routing", "Planning"], status: "active" },
  { key: "research", name: "Research Agent", description: "Builds research plans and prepares evidence-driven intelligence workflows.", capabilities: ["Research planning", "Source discovery", "Synthesis"], status: "active" },
  { key: "content", name: "Content Agent", description: "Handles future content strategy and production workflows.", capabilities: ["Writing", "Content planning", "Repurposing"], status: "planned" },
  { key: "analytics", name: "Analytics Agent", description: "Handles future metrics, reporting, and performance analysis.", capabilities: ["Metrics", "Reporting", "Performance analysis"], status: "planned" },
];

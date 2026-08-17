import type { AgentPlan } from "./types";

export type TaskRunStatus = "running" | "completed" | "failed";

export interface TaskRunResult {
  status: TaskRunStatus;
  phase: "execution" | "completed" | "failed";
  agent: AgentPlan["route"]["agent"];
  message: string;
  output: Record<string, unknown>;
}

export function runTaskPlan(plan: AgentPlan): TaskRunResult {
  try {
    return {
      status: "completed",
      phase: "completed",
      agent: plan.route.agent,
      message: `Execution plan prepared successfully for the ${plan.route.agent} agent.`,
      output: {
        objective: plan.objective,
        steps: plan.steps,
      },
    };
  } catch (error) {
    return {
      status: "failed",
      phase: "failed",
      agent: plan.route.agent,
      message: error instanceof Error ? error.message : "Unknown execution error.",
      output: {},
    };
  }
}

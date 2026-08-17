export interface ResearchPlan {
  objective: string;
  queries: string[];
  deliverables: string[];
}

export function createResearchPlan(objective: string): ResearchPlan {
  const cleanObjective = objective.trim();

  return {
    objective: cleanObjective,
    queries: [
      cleanObjective,
      `${cleanObjective} latest developments`,
      `${cleanObjective} authoritative sources`,
    ],
    deliverables: [
      "Executive summary",
      "Key findings",
      "Evidence and source list",
      "Open questions and uncertainties",
      "Recommended next actions",
    ],
  };
}

export function createResearchResultTemplate(plan: ResearchPlan) {
  return {
    status: "planned" as const,
    objective: plan.objective,
    findings: [],
    sources: [],
    uncertainties: [],
    recommendations: [],
  };
}

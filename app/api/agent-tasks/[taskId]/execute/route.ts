import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAgentPlan } from "@/lib/agents/ceo-router";
import { createResearchPlan } from "@/lib/agents/research-agent";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ taskId: string }> },
) {
  const { taskId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { data: task, error: taskError } = await supabase
    .from("agent_tasks")
    .select("id, project_id, title, status")
    .eq("id", taskId)
    .maybeSingle();

  if (taskError) return NextResponse.json({ error: taskError.message }, { status: 500 });
  if (!task) return NextResponse.json({ error: "Task not found." }, { status: 404 });

  const plan = createAgentPlan({ taskId: task.id, projectId: task.project_id, objective: task.title });

  const { data: agent, error: agentError } = await supabase
    .from("agents")
    .select("id, name, status, agent_type")
    .eq("project_id", task.project_id)
    .eq("agent_type", plan.route.agent)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  if (agentError) return NextResponse.json({ error: agentError.message }, { status: 500 });

  const specialistPlan = plan.route.agent === "research" ? createResearchPlan(plan.objective) : null;
  const result = {
    phase: "planned",
    route: plan.route,
    steps: plan.steps,
    specialistPlan,
    assignedAgent: agent ? { id: agent.id, name: agent.name, type: agent.agent_type } : null,
  };

  const { error: updateError } = await supabase
    .from("agent_tasks")
    .update({ agent_id: agent?.id ?? null, status: "running", result })
    .eq("id", task.id)
    .eq("project_id", task.project_id);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ taskId: task.id, status: "running", route: plan.route, assignedAgent: agent ?? null, plan, specialistPlan });
}

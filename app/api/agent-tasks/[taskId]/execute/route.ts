import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAgentPlan } from "@/lib/agents/ceo-router";
import { createResearchPlan } from "@/lib/agents/research-agent";
import { runTaskPlan } from "@/lib/agents/task-runner";

async function recordEvent(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>, projectId: string, eventType: string, message: string) {
  const { error } = await supabase.from("system_events").insert({
    project_id: projectId,
    event_type: eventType,
    message,
  });
  return error;
}

export async function POST(_request: Request, { params }: { params: Promise<{ taskId: string }> }) {
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
  if (!agent) {
    await recordEvent(supabase, task.project_id, "agent_task_failed", `Task ${task.id} could not start: no active ${plan.route.agent} agent.`);
    return NextResponse.json({ error: `No active ${plan.route.agent} agent is registered for this project.` }, { status: 409 });
  }

  const startEventError = await recordEvent(supabase, task.project_id, "agent_task_started", `Task ${task.id} routed to ${agent.name}.`);
  if (startEventError) return NextResponse.json({ error: startEventError.message }, { status: 500 });

  const specialistPlan = plan.route.agent === "research" ? createResearchPlan(plan.objective) : null;
  const execution = runTaskPlan(plan);
  const result = {
    phase: execution.phase,
    route: plan.route,
    assignedAgent: { id: agent.id, name: agent.name, type: agent.agent_type },
    steps: plan.steps,
    specialistPlan,
    execution: execution.output,
    message: execution.message,
  };

  const { error: updateError } = await supabase
    .from("agent_tasks")
    .update({ agent_id: agent.id, status: execution.status, result })
    .eq("id", task.id)
    .eq("project_id", task.project_id);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  const completionType = execution.status === "completed" ? "agent_task_completed" : "agent_task_failed";
  const completionError = await recordEvent(supabase, task.project_id, completionType, `Task ${task.id} ${execution.status} by ${agent.name}.`);
  if (completionError) return NextResponse.json({ error: completionError.message }, { status: 500 });

  return NextResponse.json({ taskId: task.id, status: execution.status, assignedAgent: agent, result });
}

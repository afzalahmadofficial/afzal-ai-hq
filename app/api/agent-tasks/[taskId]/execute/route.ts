import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createAgentPlan } from "@/lib/agents/ceo-router";
import { createResearchPlan } from "@/lib/agents/research-agent";
import { runTaskPlan } from "@/lib/agents/task-runner";

async function recordEvent(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  projectId: string,
  eventType: string,
  entityId: string,
  payload: Record<string, unknown>,
) {
  return supabase.from("system_events").insert({
    project_id: projectId,
    event_type: eventType,
    severity: eventType.endsWith("failed") ? "ERROR" : "INFO",
    actor_type: "USER",
    entity_type: "agent_task",
    entity_id: entityId,
    payload,
  });
}

export async function POST(_request: Request, { params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { data: task, error: taskError } = await supabase
    .from("agent_tasks")
    .select("id, project_id, agent_id, task_type, status, input")
    .eq("id", taskId)
    .maybeSingle();
  if (taskError) return NextResponse.json({ error: taskError.message }, { status: 500 });
  if (!task) return NextResponse.json({ error: "Task not found." }, { status: 404 });
  if (["RUNNING", "SUCCEEDED"].includes(task.status)) return NextResponse.json({ error: `Task is already ${task.status.toLowerCase()}.` }, { status: 409 });

  const input = (task.input && typeof task.input === "object" ? task.input : {}) as Record<string, unknown>;
  const objective = typeof input.objective === "string" ? input.objective : task.task_type;
  const plan = createAgentPlan({ taskId: task.id, projectId: task.project_id, objective });

  const { data: agent, error: agentError } = await supabase
    .from("agents")
    .select("id, name, status, agent_type")
    .eq("id", task.agent_id ?? "00000000-0000-0000-0000-000000000000")
    .eq("project_id", task.project_id)
    .maybeSingle();
  if (agentError) return NextResponse.json({ error: agentError.message }, { status: 500 });
  if (!agent || agent.status !== "ACTIVE") return NextResponse.json({ error: "Task has no active assigned agent." }, { status: 409 });

  const startEvent = await recordEvent(supabase, task.project_id, "agent_task_started", task.id, { agent_id: agent.id, agent_type: agent.agent_type, objective });
  if (startEvent.error) return NextResponse.json({ error: startEvent.error.message }, { status: 500 });

  const { error: runningError } = await supabase
    .from("agent_tasks")
    .update({ status: "RUNNING", started_at: new Date().toISOString() })
    .eq("id", task.id)
    .eq("project_id", task.project_id);
  if (runningError) return NextResponse.json({ error: runningError.message }, { status: 500 });

  const specialistPlan = plan.route.agent === "research" ? createResearchPlan(plan.objective) : null;
  const execution = runTaskPlan(plan);
  const output = { phase: execution.phase, route: plan.route, assignedAgent: { id: agent.id, name: agent.name, type: agent.agent_type }, steps: plan.steps, specialistPlan, execution: execution.output, message: execution.message };
  const finalStatus = execution.status === "completed" ? "SUCCEEDED" : "FAILED";

  const { error: finalError } = await supabase
    .from("agent_tasks")
    .update({ status: finalStatus, output: finalStatus === "SUCCEEDED" ? output : null, error: finalStatus === "FAILED" ? { message: execution.message } : null, completed_at: new Date().toISOString() })
    .eq("id", task.id)
    .eq("project_id", task.project_id);
  if (finalError) return NextResponse.json({ error: finalError.message }, { status: 500 });

  const completionEvent = await recordEvent(supabase, task.project_id, finalStatus === "SUCCEEDED" ? "agent_task_completed" : "agent_task_failed", task.id, { agent_id: agent.id, status: finalStatus, output: finalStatus === "SUCCEEDED" ? output : undefined, error: finalStatus === "FAILED" ? { message: execution.message } : undefined });
  if (completionEvent.error) return NextResponse.json({ error: completionEvent.error.message }, { status: 500 });

  return NextResponse.json({ taskId: task.id, status: finalStatus, assignedAgent: agent, output });
}

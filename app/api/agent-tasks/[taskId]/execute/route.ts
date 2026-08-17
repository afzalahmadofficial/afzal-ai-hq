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

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { data: task, error: taskError } = await supabase
    .from("agent_tasks")
    .select("id, project_id, title, status")
    .eq("id", taskId)
    .maybeSingle();

  if (taskError) {
    return NextResponse.json({ error: taskError.message }, { status: 500 });
  }

  if (!task) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  const plan = createAgentPlan({
    taskId: task.id,
    projectId: task.project_id,
    objective: task.title,
  });

  const { error: updateError } = await supabase
    .from("agent_tasks")
    .update({
      status: "running",
      result: {
        phase: "planned",
        route: plan.route,
        steps: plan.steps,
      },
    })
    .eq("id", task.id)
    .eq("project_id", task.project_id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const specialistPlan = plan.route.agent === "research"
    ? createResearchPlan(plan.objective)
    : null;

  return NextResponse.json({
    taskId: task.id,
    status: "running",
    route: plan.route,
    plan,
    specialistPlan,
  });
}

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main style={{ minHeight: "100vh", padding: 40 }}>
      <p style={{ margin: 0, color: "#667085" }}>Authenticated user</p>
      <h1 style={{ marginTop: 8 }}>Project Selection</h1>
      <p style={{ color: "#667085" }}>
        Signed in as {user.email ?? "your account"}. Project membership loading will be connected in the next milestone.
      </p>
    </main>
  );
}

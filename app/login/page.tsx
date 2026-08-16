"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage(error.message);
        return;
      }

      window.location.href = "/projects";
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <section style={{ width: "100%", maxWidth: 420, padding: 32, background: "#fff", border: "1px solid #e5e9f0", borderRadius: 16 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Afzal Ahmad AI HQ</p>
        <h1 style={{ margin: "12px 0 8px", fontSize: 32 }}>Sign in</h1>
        <p style={{ margin: "0 0 24px", color: "#667085" }}>Access your private AI Headquarters.</p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 8 }}>
            <span>Email</span>
            <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} style={{ padding: 12, border: "1px solid #d0d5dd", borderRadius: 8 }} />
          </label>

          <label style={{ display: "grid", gap: 8 }}>
            <span>Password</span>
            <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} style={{ padding: 12, border: "1px solid #d0d5dd", borderRadius: 8 }} />
          </label>

          {message && <p role="alert" style={{ margin: 0, color: "#b42318" }}>{message}</p>}

          <button disabled={loading} type="submit" style={{ padding: 12, border: 0, borderRadius: 8, background: "#172033", color: "#fff", cursor: loading ? "wait" : "pointer" }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

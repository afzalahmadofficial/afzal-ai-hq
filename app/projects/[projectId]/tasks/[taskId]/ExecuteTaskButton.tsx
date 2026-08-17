"use client";

import { useState } from "react";

export function ExecuteTaskButton({ taskId }: { taskId: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function execute() {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/agent-tasks/${taskId}/execute`, { method: "POST" });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Execution failed.");
      setMessage(`Execution started. Routed to ${body.route.agent}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Execution failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={execute} disabled={loading} type="button" style={{ padding: "11px 16px", border: 0, borderRadius: 9, background: "#172033", color: "#fff", cursor: loading ? "wait" : "pointer" }}>
        {loading ? "Starting…" : "Execute Task"}
      </button>
      {message && <p role="status" style={{ marginTop: 10, color: "#475467" }}>{message}</p>}
    </div>
  );
}

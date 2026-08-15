export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 32 }}>
      <section style={{ maxWidth: 720, textAlign: "center" }}>
        <p style={{ marginBottom: 12, fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Afzal Ahmad AI HQ
        </p>
        <h1 style={{ margin: 0, fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.05 }}>
          Personal AI Headquarters
        </h1>
        <p style={{ margin: "24px auto 0", maxWidth: 560, fontSize: 18, lineHeight: 1.6, color: "#5d6678" }}>
          Application bootstrap is ready. Authentication, project context, the protected shell, and the Command Center are the next implementation layers.
        </p>
      </section>
    </main>
  );
}

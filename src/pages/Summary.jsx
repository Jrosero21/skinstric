// src/pages/Summary.jsx
// Minimal placeholder so /summary stops falling back to Home.
// Keep layout simple; we’ll flesh out UI next.

import Header from "../components/Header";

export default function Summary() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header will show [ ANALYSIS ] and hide ENTER CODE via your Header logic */}
      <Header />

      <section className="min-h-[92vh] relative md:pt-[64px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Summary</h1>
          <p className="mt-2 text-sm text-[#6B6F74]">
            Placeholder page wired to <code>/summary</code>. Content coming next.
          </p>
        </div>
      </section>
    </main>
  );
}

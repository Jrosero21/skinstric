const features = [
    {
    title: "Precision Scanning",
    desc: "Analyze pores, texture, and tone with sub-millimeter accuracy.",
    },
    { title: "Personalized Plans", desc: "Tailored regimens based on your unique skin profile." },
    { title: "Track Progress", desc: "Before/after timelines and metrics you can trust." },
    ];
    
    
    export default function FeatureGrid() {
    return (
    <section id="tech" className="py-16 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl">
    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Technology that sees more</h2>
    <p className="mt-3 text-gray-600">A modern stack pairing computer vision with dermatology-grade heuristics.</p>
    </div>
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {features.map((f) => (
    <div key={f.title} className="rounded-3xl border p-6 shadow-sm">
    <h3 className="font-semibold">{f.title}</h3>
    <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
    </div>
    ))}
    </div>
    </div>
    </section>
    );
    }
export default function Hero() {
    return (
    <section className="relative h-[80vh] min-h-[540px] w-full overflow-hidden">
    <video
    className="absolute inset-0 h-full w-full object-cover"
    src="/homepage.mp4"
    autoPlay
    muted
    loop
    playsInline
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
    <div className="relative z-10 h-full">
    <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl text-white">
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
    Intelligent Skin Analysis
    </h1>
    <p className="mt-4 text-base sm:text-lg text-white/90">
    Real-time scans. Actionable insights. Personalized routines backed by AI.
    </p>
    <div className="mt-8 flex gap-3">
    <a href="#tech" className="inline-block rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm backdrop-blur hover:bg-white/20 transition">
    Learn more
    </a>
    <a href="#contact" className="inline-block rounded-2xl bg-white text-gray-900 px-5 py-3 text-sm font-medium hover:bg-gray-100 transition">
    Get started
    </a>
    </div>
    </div>
    </div>
    </div>
    </section>
    );
    }
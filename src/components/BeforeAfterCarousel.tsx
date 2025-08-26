// const items = [
//     { before: "/images/before-1.jpg", after: "/images/after-1.jpg" },
//     { before: "/images/before-2.jpg", after: "/images/after-2.jpg" },
//     { before: "/images/before-3.jpg", after: "/images/after-3.jpg" },
//     ];
    
    
//     export default function BeforeAfterCarousel() {
//     return (
//     <section id="results" className="py-16 sm:py-24 bg-gray-50">
//     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//     <div className="flex items-end justify-between gap-4">
//     <div>
//     <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Visible results</h2>
//     <p className="mt-3 text-gray-600">Swipe to explore before/after progress from real users.</p>
//     </div>
//     <div className="hidden sm:flex gap-2">
//     <a href="#carousel-start" className="px-3 py-2 rounded-xl border text-sm">Start</a>
//     <a href="#carousel-end" className="px-3 py-2 rounded-xl border text-sm">End</a>
//     </div>
//     </div>
    
    
//     <div className="mt-8 overflow-auto">
//     <div className="grid grid-flow-col auto-cols-[85%] sm:auto-cols-[55%] md:auto-cols-[40%] gap-4 snap-x snap-mandatory" id="carousel-start">
//     {items.map((pair, idx) => (
//     <article key={idx} className="snap-center rounded-3xl overflow-hidden border bg-white">
//     <div className="grid grid-cols-2">
//     <figure className="relative aspect-[4/5]">
//     <img src={pair.before} alt={`Before ${idx + 1}`} className="h-full w-full object-cover" />
//     <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">Before</figcaption>
//     </figure>
//     <figure className="relative aspect-[4/5]">
//     <img src={pair.after} alt={`After ${idx + 1}`} className="h-full w-full object-cover" />
//     <figcaption className="absolute bottom-2 left-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white">After</figcaption>
//     </figure>
//     </div>
//     </article>
//     ))}
//     <div id="carousel-end" />
//     </div>
//     </div>
//     </div>
//     </section>
//     );
//     }
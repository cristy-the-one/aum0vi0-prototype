import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * AUMOVIO – Brand Prototype (React + Tailwind + Framer Motion)
 * Dark theme build
 */

const COLORS = {
  violet: "#3B2E91",
  orange: "#F15A29",
  white: "#FFFFFF",
  amber: "#FFC857",
  cyan: "#00E5FF",
};

const gradientStyle = {
  background: `linear-gradient(120deg, ${COLORS.violet} 0%, ${COLORS.orange} 100%)`,
};

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative w-full ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 md:px-10 ${className}`}>{children}</div>
);

const Rocket = ({ size = 46, color = COLORS.white, glow = false }) => (
  <svg width={size} height={size} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter={glow ? "url(#glow)" : undefined}>
      <polygon points="23,2 33,22 23,19 13,22" fill={color} />
      <polygon points="13,22 23,44 23,19" fill={color} opacity="0.85" />
      <polygon points="33,22 23,44 23,19" fill={color} opacity="0.65" />
    </g>
  </svg>
);

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm bg-black/70">
      <Container className="flex items-center justify-between py-4">
        <a href="#hero" className="group inline-flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl" style={gradientStyle} />
          <span className="text-white group-hover:text-white font-semibold tracking-wide">AUMOVIO</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-white/90">
          <a href="#timeline" className="hover:text-white transition">Journey</a>
          <a href="#innovation" className="hover:text-white transition">Innovation</a>
          <a href="#listing" className="hover:text-white transition">Listing Day</a>
          <a href="#portal" className="hover:text-white transition">Brand Portal</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
      </Container>
    </header>
  );
};

const Hero = ({ onOpenVideo }) => {
  return (
    <Section id="hero" className="min-h-[92vh] pt-24 flex items-center" style={gradientStyle}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
      <FloatingRockets />
      <Container className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Independent. Innovative. In Motion.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-4 text-white/90 text-lg md:text-xl max-w-xl"
          >
            From brand launch to listing day — AUMOVIO is shaping the future of automotive technology with AI-driven momentum and human ingenuity.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#timeline" className="group inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-black bg-white hover:bg-white/90 transition shadow-lg">
              Explore Our Journey
              <span className="group-hover:translate-x-0.5 transition">→</span>
            </a>
            <button onClick={onOpenVideo} className="rounded-2xl px-5 py-3 font-semibold text-white border border-white/70 hover:bg-white/10 transition">
              Watch Brand Days Live
            </button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="relative">
            <div className="absolute -inset-6 rounded-3xl opacity-60 blur-2xl" style={gradientStyle} />
            <div className="relative rounded-3xl bg-white/5 p-8 ring-1 ring-white/20 backdrop-blur-md">
              <div className="flex items-center gap-6">
                <Rocket size={64} color={COLORS.white} glow />
                <div>
                  <div className="text-white/90 font-semibold">Signature Motif</div>
                  <div className="text-white/70 text-sm">Paper rockets & dotted ascent — momentum made visible.</div>
                </div>
              </div>
              <div className="mt-6 h-px bg-white/20" />
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Violet", sw: COLORS.violet },
                  { label: "Blend", sw: `linear-gradient(120deg, ${COLORS.violet}, ${COLORS.orange})` },
                  { label: "Orange", sw: COLORS.orange },
                ].map((c, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-14 w-full rounded-xl shadow-inner" style={{ background: c.sw }} />
                    <div className="text-white/80 text-xs">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

const FloatingRockets = () => {
  const rockets = [
    { x: "10%", delay: 0 },
    { x: "25%", delay: 0.6 },
    { x: "50%", delay: 0.2 },
    { x: "70%", delay: 0.9 },
    { x: "85%", delay: 0.3 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {rockets.map((r, idx) => (
        <motion.div key={idx} className="absolute bottom-[-60px] flex flex-col items-center"
          style={{ left: r.x }}
          initial={{ y: 0, opacity: 0.2 }}
          animate={{ y: -800, opacity: [0.2, 0.6, 0] }}
          transition={{ duration: 12, repeat: Infinity, delay: r.delay }}
        >
          <div className="h-28 w-0.5 border-dashed border-l-2" style={{ borderColor: "rgba(255,255,255,0.5)" }} />
          <Rocket size={64} color={COLORS.violet} />
        </motion.div>
      ))}
    </div>
  );
};

const TimelineCard = ({ date, title, text, cta }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="min-w-[280px] md:min-w-[340px] shrink-0 rounded-2xl p-5 bg-neutral-900/80 backdrop-blur-md shadow-lg border border-white/10 hover:-translate-y-1 hover:shadow-xl transition"
    >
      <div className="text-sm font-semibold text-white/70">{date}</div>
      <div className="mt-1 text-lg font-bold text-white">{title}</div>
      <div className="mt-2 text-white/70 text-sm">{text}</div>
      {cta && (
        <button className="mt-3 inline-flex items-center gap-1 text-indigo-300 font-semibold hover:underline">
          {cta} <span>→</span>
        </button>
      )}
    </motion.div>
  );
};

const TimelinePro = () => {
  const items = [
    { date: "July 16, 2024", title: "Logo reveal & global webcast", text: "Our identity comes into focus with a bold emblem and unified message." },
    { date: "Sept 2, 2025", title: "Brand Days worldwide", text: "Celebrations and workshops across locations to live our values." },
    { date: "Sept 8, 2025", title: "IAA MOBILITY debut", text: "Public showcase of the AUMOVIO story and technology." },
    { date: "Sept 18, 2025", title: "Frankfurt Stock Exchange listing", text: "Ring the Bell – marking our independence and next chapter." },
  ];

  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [ticks, setTicks] = useState([]); // normalized 0..1 positions for each card center
  const dragState = useRef({ x: 0, scrollLeft: 0 });

  // Compute progress + active card on scroll/resize
  useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    const handler = () => {
      const max = Math.max(1, el.scrollWidth - el.clientWidth);
      const p = Math.min(1, Math.max(0, el.scrollLeft / max));
      setProgress(p);

      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      cardRefs.current.forEach((cr, idx) => {
        if (!cr) return;
        const rect = cr.getBoundingClientRect();
        const center = rect.left + rect.width / 2 + el.scrollLeft - el.getBoundingClientRect().left;
        const d = Math.abs(center - mid);
        if (d < bestDist) { bestDist = d; best = idx; }
      });
      setActive(best);
    };

    const computeTicks = () => {
      const max = Math.max(1, el.scrollWidth - el.clientWidth);
      const leftEdge = el.getBoundingClientRect().left;
      const arr = cardRefs.current.map((cr) => {
        if (!cr) return 0;
        const rect = cr.getBoundingClientRect();
        const center = rect.left + rect.width / 2 + el.scrollLeft - leftEdge; // center in scroller coords
        const normalized = Math.min(1, Math.max(0, (center - el.clientWidth / 2) / max));
        return normalized;
      });
      setTicks(arr);
    };

    handler();
    computeTicks();

    el.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', computeTicks);
    return () => { el.removeEventListener('scroll', handler); window.removeEventListener('resize', computeTicks); };
  }, []);

  const scrollToIndex = (idx) => {
    const el = scrollerRef.current; const target = cardRefs.current[idx]; if (!el || !target) return;
    const left = target.offsetLeft - (el.clientWidth - target.clientWidth) / 2;
    el.scrollTo({ left, behavior: 'smooth' });
  };

  const onPrev = () => scrollToIndex(Math.max(0, active - 1));
  const onNext = () => scrollToIndex(Math.min(items.length - 1, active + 1));

  // Translate vertical wheel into horizontal scroll
  useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Click-drag to scroll (desktop)
  const onPointerDown = (e) => {
    const el = scrollerRef.current; if (!el) return;
    setDragging(true);
    dragState.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isDragging) return; const el = scrollerRef.current; if (!el) return;
    const dx = e.clientX - dragState.current.x;
    el.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const onPointerUp = () => setDragging(false);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); onNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  // Mini self-tests (non-breaking)
  useEffect(() => {
    try { console.assert(active >= 0 && active < items.length, 'active index within bounds'); } catch {}
    try { console.assert(progress >= 0 && progress <= 1, 'progress between 0 and 1'); } catch {}
  }, [active, progress]);

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>
      <Section id="timeline" className="py-24 bg-neutral-950">
      <Container>
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">From Launch to Listing</h2>
          <a href="#listing" className="hidden md:inline-block rounded-xl px-4 py-2 font-semibold text-white" style={gradientStyle}>Listing Day →</a>
        </div>
        <div className="relative">
          {/* base line */}
          <div className="absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />

          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-neutral-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-neutral-950 to-transparent" />

          <div
            ref={scrollerRef}
            className="relative flex gap-6 overflow-x-auto pb-14 pt-6 snap-x snap-mandatory select-none scrollbar-hide"
            style={{ scrollBehavior: 'smooth', cursor: isDragging ? 'grabbing' : 'grab' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {items.map((it, i) => (
              <div key={i} ref={(el) => (cardRefs.current[i] = el)} className="snap-center">
                <motion.div animate={{ scale: i === active ? 1.03 : 0.97, opacity: i === active ? 1 : 0.85 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }}>
                  <TimelineCard {...it} />
                </motion.div>
              </div>
            ))}
          </div>

          {/* mini progress bar with ticks */}
          <div className="absolute left-0 right-0 bottom-6">
            <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress * 100}%`, ...gradientStyle }} />
              {/* tick marks */}
              {ticks.map((t, i) => (
                <div key={i} className="absolute top-1/2 -translate-y-1/2 h-2 w-0.5" style={{ left: `${t * 100}%`, background: i === active ? '#fff' : 'rgba(255,255,255,0.4)' }} />
              ))}
            </div>
          </div>

          {/* controls */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button key={i} onClick={() => scrollToIndex(i)} className={`h-2.5 rounded-full transition-all ${i === active ? 'w-8 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/60'}`} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={onPrev} disabled={active === 0} className="rounded-full px-3 py-2 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40">‹</button>
              <button onClick={onNext} disabled={active === items.length - 1} className="rounded-full px-3 py-2 bg-white/10 text-white hover:bg-white/20 disabled:opacity-40">›</button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
    </>  // <-- This closing fragment tag is missing
  );
};

const Innovation = ({ onOpenAiStory }) => {
  return (
    <Section id="innovation" className="py-24" style={gradientStyle}>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%),radial-gradient(circle_at_70%_80%,white,transparent_40%)]" />
      <Container className="relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="text-white/90 font-semibold">Innovation & Technology</div>
          <h3 className="mt-2 text-3xl md:text-4xl font-extrabold text-white">Accelerating with AI</h3>
          <p className="mt-3 text-white/85 text-lg">
            Our AI ecosystem powers innovation—global labs, hands-on trainings, and production-grade tools that amplify teams across AUMOVIO.
          </p>
          <a
            href="#ai-story"
            data-skip-scroll="true"
            onClick={(e) => { e.preventDefault(); onOpenAiStory?.(); }}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-black bg-white/95 hover:bg-white transition shadow"
          >
            Read the AI Story <span>→</span>
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative">
          <div className="absolute -inset-6 blur-2xl opacity-70" style={gradientStyle} />
          <div className="relative aspect-square rounded-3xl bg-black/10 backdrop-blur-md ring-1 ring-white/30 flex items-center justify-center">
            <AIOrb />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

const AIOrb = () => {
  const dots = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="relative h-80 w-80">
      {dots.map((i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${50 + 38 * Math.cos((i / dots.length) * Math.PI * 2)}%`,
            top: `${50 + 26 * Math.sin((i / dots.length) * Math.PI * 2)}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, delay: i * 0.03, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-1 rounded-full border border-white/40" />
      <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 80px rgba(255,255,255,0.25) inset" }} />
    </div>
  );
};

const Listing = () => (
  <Section id="listing" className="py-24 bg-neutral-950 relative overflow-hidden">
    <div className="absolute -top-20 -right-24 h-72 w-72 rounded-full opacity-20" style={gradientStyle} />
    <Container className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-white">
          Frankfurt Listing — September 18
        </h3>
        <p className="mt-3 text-white/70 text-lg">
          The trading floor marks our independent chapter. Discover how the initial price is set, why it matters, and what comes next.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#special" className="rounded-xl px-5 py-3 font-semibold text-white" style={gradientStyle}>See What Makes It Special →</a>
          <a href="#timeline" className="rounded-xl px-5 py-3 font-semibold text-white bg-white/10 hover:bg-white/20">Back to Timeline</a>
        </div>
      </div>
      <TickerCard />
    </Container>
  </Section>
);

const TickerCard = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 100000), 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative rounded-3xl p-6 ring-1 ring-white/10 bg-neutral-900 shadow-lg overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1.5" style={gradientStyle} />
      <div className="text-sm font-semibold text-white/70">Live Ticker (demo)</div>
      <div className="mt-3 flex gap-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="min-w-[120px] rounded-lg bg-white/5 px-3 py-2">
            <div className="text-xs text-white/60">AUMO{i}</div>
            <div className="text-lg font-bold text-white">
              {(100 + ((tick + i * 7) % 23)).toFixed(2)} €
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-white/60">*Mock data for visual behavior.</div>
    </div>
  );
};

const BrandPortal = () => (
  <Section id="portal" className="py-24" style={gradientStyle}>
    <Container className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative">
        <div className="absolute -inset-6 blur-2xl opacity-70" style={gradientStyle} />
        <div className="relative rounded-3xl bg-white/10 ring-1 ring-white/30 backdrop-blur-md p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-white/20">🔒</div>
            <div>
              <div className="font-semibold">Brand Portal</div>
              <div className="text-white/80 text-sm">Your single source for assets, guidelines, and services.</div>
            </div>
          </div>
          <p className="mt-5 text-white/85">
            Coming soon. Sign up to be notified when we launch the AUMOVIO brand portal.
          </p>
          <form className="mt-5 flex gap-3">
            <input type="email" placeholder="your.email@aumovio.com" className="flex-1 rounded-xl px-4 py-3 bg-white/90 text-black placeholder-black/40 focus:outline-none" />
            <button className="rounded-xl px-5 py-3 font-semibold text-black bg-white/95 hover:bg-white transition">Notify Me</button>
          </form>
        </div>
      </div>
      <div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-white">Design Language</h3>
        <ul className="mt-4 space-y-3 text-white/90 list-disc pl-5">
          <li>Signature gradient (violet → orange) as the primary brand field.</li>
          <li>Paper-rocket motif with dotted ascent lines to symbolize momentum.</li>
          <li>Geometric headline font (Montserrat), humanist body font (Inter).</li>
          <li>Rounded, tactile components with light glassmorphism.</li>
        </ul>
      </div>
    </Container>
  </Section>
);

const Footer = () => (
  <footer id="contact" className="py-12 text-white" style={gradientStyle}>
    <Container className="grid md:grid-cols-3 gap-8 items-start">
      <div>
        <div className="inline-flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl" style={gradientStyle} />
          <span className="font-semibold tracking-wide">AUMOVIO</span>
        </div>
        <p className="mt-3 text-white/85 max-w-sm">Independent. Innovative. In Motion.</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="font-semibold mb-2">Explore</div>
          <ul className="space-y-1 text-white/85">
            <li><a href="#hero" className="hover:underline">Home</a></li>
            <li><a href="#timeline" className="hover:underline">Journey</a></li>
            <li><a href="#innovation" className="hover:underline">Innovation</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-1 text-white/85">
            <li><a href="#listing" className="hover:underline">Listing Day</a></li>
            <li><a href="#portal" className="hover:underline">Brand Portal</a></li>
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="text-xs text-white/80">
        Note: This is a concept prototype. Some sections contain placeholder behavior and mock data. Internal news not for external distribution.
      </div>
    </Container>
  </footer>
);

const VideoModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden ring-1 ring-white/20">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 rounded-md bg-white/90 px-3 py-1 text-sm font-semibold hover:bg-white">Close</button>
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
          title="Brand Days Live"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

const AiStoryModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="relative w-full max-w-3xl max-h-[80vh] bg-gray-900 rounded-2xl overflow-hidden ring-1 ring-white/20">
        <div className="h-1.5" style={gradientStyle} />
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-white">
              AUMOVIO AI Story
            </h3>
            <button
              onClick={onClose}
              className="rounded-md px-3 py-1 text-sm font-semibold bg-white/10 text-white hover:bg-white/20"
            >
              Close
            </button>
          </div>
          <div className="mt-3 text-gray-200 space-y-3 overflow-auto max-h-[58vh] pr-1">
            <p>
              Our AI ecosystem empowers teams with a unified platform for experimentation,
              training, and deployment. From global AI labs to domain-specific toolchains,
              we accelerate product cycles while maintaining rigorous quality.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              <li>Global AI labs for collaborative R&D</li>
              <li>Training programs for engineers and product teams</li>
              <li>Tooling that scales from prototype to production</li>
              <li>Responsible AI governance and model observability</li>
            </ul>
            <p>
              This article is a placeholder. Provide the final copy and media assets
              and I’ll wire rich content blocks (images, quotes, code, charts) with
              the same visual language.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function findAnchorTarget(href) {
  if (!href || href === "#" || href.trim() === "#") return null;
  if (href.startsWith("#")) {
    const id = href.slice(1);
    return document.getElementById(id);
  }
  return null;
}

(function selfTests() {
  try {
    console.assert(findAnchorTarget("#") === null, "'#' should return null");
    console.assert(findAnchorTarget("") === null, "empty href should return null");
  } catch (e) {}
})();

const Special = () => (
  <Section id="special" className="py-24" style={gradientStyle}>
    <Container>
      <h3 className="text-2xl md:text-3xl font-extrabold text-white">What Makes Listing Day Special</h3>
      <p className="mt-3 text-white/90 max-w-3xl">
        Placeholder content for the listing-day deep dive. Swap for real content or link out to investor relations when ready.
      </p>
    </Container>
  </Section>
);

export default function App() {
  const [openVideo, setOpenVideo] = useState(false);
  const [openAi, setOpenAi] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      if (a.hasAttribute('data-skip-scroll')) return;
      const href = a.getAttribute('href');
      const target = findAnchorTarget(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    try {
      console.assert(!!document.getElementById('special'), "#special target should exist");
      console.assert(findAnchorTarget('#ai-story') === null, "#ai-story should not have a DOM target (modal only)");
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      <Hero onOpenVideo={() => setOpenVideo(true)} />
      <TimelinePro />
      <Innovation onOpenAiStory={() => setOpenAi(true)} />
      <Listing />
      <Special />
      <BrandPortal />
      <Footer />
      <VideoModal open={openVideo} onClose={() => setOpenVideo(false)} />
      <AiStoryModal open={openAi} onClose={() => setOpenAi(false)} />
    </div>
  );
}

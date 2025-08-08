```react
// ... previous imports remain unchanged

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
      <Section id=\"timeline\" className="py-24 bg-neutral-950">
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
  );
};
    handler();
    el.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => { el.removeEventListener('scroll', handler); window.removeEventListener('resize', handler); };
  }, []);

  const scrollToIndex = (idx) => {
    const el = scrollerRef.current;
    const target = cardRefs.current[idx];
    if (!el || !target) return;
    const left = target.offsetLeft - (el.clientWidth - target.clientWidth) / 2;
    el.scrollTo({ left, behavior: 'smooth' });
  };

  const onPrev = () => scrollToIndex(Math.max(0, active - 1));
  const onNext = () => scrollToIndex(Math.min(items.length - 1, active + 1));

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

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

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); onNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <Section id="timeline" className="py-24 bg-neutral-950">
      <Container>
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">From Launch to Listing</h2>
          <a href="#listing" className="hidden md:inline-block rounded-xl px-4 py-2 font-semibold text-white" style={gradientStyle}>Listing Day →</a>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-neutral-950 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-neutral-950 to-transparent" />

          <div
            ref={scrollerRef}
            className="relative flex gap-6 overflow-x-auto overflow-y-hidden pb-10 pt-6 snap-x snap-mandatory select-none scrollbar-hide"
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

          <div className="absolute inset-x-0 bottom-6 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-orange-500" style={{ width: `${progress * 100}%` }} />
          </div>

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
  );
};
```

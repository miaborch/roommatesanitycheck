function Starburst({ size, color, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} aria-hidden className={className}>
      <polygon points="50,5 57,33 82,18 67,43 95,50 67,57 82,82 57,67 50,95 43,67 18,82 33,57 5,50 33,43 18,18 43,33" />
    </svg>
  )
}

/* Circular flat stamp — no border, no shadow, pure graphic */
function Stamp({ emoji, line1, line2, color, textColor, rotate = 0, className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none inline-flex flex-col items-center justify-center w-[68px] h-[68px] rounded-full text-center ${className}`}
      style={{ background: color, color: textColor, transform: `rotate(${rotate}deg)` }}
    >
      <span className="text-xl leading-none">{emoji}</span>
      <span className="text-[8px] font-black uppercase tracking-[0.12em] leading-tight mt-1">
        {line1}<br />{line2}
      </span>
    </div>
  )
}

/* Taped note — flat paper rectangle with a tape strip, no border, no shadow */
function TapedNote({ children, color, rotate = 0, className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none relative inline-block ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-9 h-[18px] rounded-[3px] z-10"
        style={{ background: 'rgba(250,248,243,0.30)' }}
      />
      <div
        className="px-3.5 py-2.5 rounded-[4px] text-center"
        style={{ background: color }}
      >
        {children}
      </div>
    </div>
  )
}

export default function HeroSection({ onGoToDashboard }) {
  return (
    <section className="relative bg-brick-red overflow-hidden pb-44">

      {/* ── Black nav bar ────────────────────────────────── */}
      <div className="relative z-20 bg-black">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
          <span
            className="text-xl text-brick-red"
            style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.06em' }}
          >
            SPLITZY
          </span>
          <button
            onClick={onGoToDashboard}
            className="text-[12px] font-bold text-warm-white/55 hover:text-warm-white border border-white/15 hover:border-white/40 px-3 py-1.5 rounded-lg transition-all duration-150"
          >
            I already owe rent →
          </button>
        </div>
      </div>

      {/* ── Background texture ───────────────────────────── */}
      {/* Large starburst: scaled down on mobile, full size on desktop */}
      <Starburst
        size={240}
        color="rgba(250,248,243,0.055)"
        className="absolute -bottom-10 -right-10 pointer-events-none select-none md:hidden"
      />
      <Starburst
        size={420}
        color="rgba(250,248,243,0.05)"
        className="absolute -bottom-20 -right-20 pointer-events-none select-none hidden md:block"
      />
      {/* Small accent starburst: desktop only — too close to headline on mobile */}
      <Starburst
        size={120}
        color="rgba(250,248,243,0.08)"
        className="absolute top-20 left-8 pointer-events-none select-none hidden md:block"
      />

      {/* ── Decorative labels: desktop only ──────────────── */}
      <div className="hidden md:block absolute top-[72px] right-12 z-10 animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.35s_both]">
        <Stamp
          emoji="💸"
          line1="free"
          line2="forever"
          color="#D4A853"
          textColor="#171717"
          rotate={8}
        />
      </div>

      <div className="hidden md:block absolute bottom-36 left-12 z-10 animate-[popIn_0.5s_cubic-bezier(0.34,1.56,0.64,1)_0.55s_both]">
        <TapedNote color="#8CB9E8" rotate={-6}>
          <p className="text-[10px] font-black uppercase tracking-[0.1em] text-black leading-tight">
            no<br />spreadsheets
          </p>
        </TapedNote>
      </div>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-8 md:pt-14">

        {/* Eyebrow: desktop only — headline stands alone on mobile */}
        <div className="hidden md:inline-flex items-center gap-2 mb-6">
          <Starburst size={11} color="rgba(250,248,243,0.6)" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-warm-white/55">
            for roommates who do math
          </span>
        </div>

        <div className="max-w-3xl">
          <h1
            className="leading-[0.92] text-warm-white mb-7 md:mb-9"
            style={{ fontFamily: 'Anton, sans-serif' }}
          >
            <span className="block text-[clamp(2.8rem,8.5vw,6.8rem)]">PICK ROOMS.</span>
            <span className="block text-[clamp(2.8rem,8.5vw,6.8rem)] relative w-fit">
              SPLIT RENT.
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[4px] w-full bg-warm-white rounded-full opacity-20"
              />
            </span>
            <span className="block text-[clamp(2.8rem,8.5vw,6.8rem)]">STAY FRIENDS.</span>
          </h1>

          {/* Subhead */}
          <p className="text-[1.15rem] md:text-[1.2rem] font-bold text-warm-white/90 leading-snug mb-3">
            Because one room always sucks.
          </p>
          <p className="text-[13px] text-warm-white/50 leading-relaxed mb-7 md:mb-10 max-w-md">
            Settle it with room sizes, not vibes. Works in under 2 minutes.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
            <button
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2.5 bg-warm-white text-black border-2 border-black px-7 py-3.5 rounded-xl font-black text-[15px] shadow-[4px_4px_0_#171717] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#171717] active:translate-y-0.5 active:shadow-[2px_2px_0_#171717] transition-all duration-100 w-full sm:w-auto"
            >
              Run the numbers
              <span className="text-brick-red">→</span>
            </button>
            {/* Tagline: visible on all sizes, subordinate enough it doesn't clutter */}
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-warm-white/25" />
              <span className="text-[11px] font-semibold text-warm-white/35 tracking-wide">
                No sign-up. No nonsense.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

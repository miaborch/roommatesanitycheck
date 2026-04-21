import { useEffect, useRef, useState } from 'react'

const ACCENTS = [
  { bg: '#C94B32', fg: '#FAF8F3', dark: true },
  { bg: '#8CB9E8', fg: '#171717', dark: false },
  { bg: '#6BAE9F', fg: '#FAF8F3', dark: true },
  { bg: '#D4A853', fg: '#171717', dark: false },
  { bg: '#9B7EC8', fg: '#FAF8F3', dark: true },
  { bg: '#E8956A', fg: '#171717', dark: false },
]

function useCountUp(target, duration = 550) {
  const [display, setDisplay] = useState(target)
  const rafRef   = useRef(null)
  const fromRef  = useRef(target)

  useEffect(() => {
    const from  = fromRef.current
    const start = performance.now()
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    function tick(now) {
      const t      = Math.min((now - start) / duration, 1)
      const eased  = 1 - Math.pow(1 - t, 3)
      setDisplay(from + (target - from) * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = target
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}

function AnimatedAmount({ value }) {
  const animated = useCountUp(value)
  return `$${animated.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function ResultsSection({ results, totalRent }) {
  const [barsReady, setBarsReady] = useState(false)
  const prevKeyRef = useRef(null)
  const key = results.map(r => r.id + r.rent).join('-')

  useEffect(() => {
    if (key === prevKeyRef.current) return
    prevKeyRef.current = key
    setBarsReady(false)
    const id = setTimeout(() => setBarsReady(true), 80)
    return () => clearTimeout(id)
  }, [key])

  if (!results || results.length === 0) return null

  const maxPercent = Math.max(...results.map(r => r.percent))

  const sorted = [...results].sort((a, b) => b.rent - a.rent)

  // Badge tier system — colors are fixed and independent of card accent colors
  // so they always contrast against any card header background.
  const BADGE_TIERS = {
    priciest:   { label: '↑ PRICIEST',  bg: '#C94B32', fg: '#FAF8F3', border: 'rgba(255,255,255,0.25)' },
    bestDeal:   { label: '✓ BEST DEAL', bg: '#1A7A58', fg: '#FAF8F3', border: 'rgba(255,255,255,0.25)' },
    middle:     { bg: '#D4A853',        fg: '#171717', border: 'rgba(0,0,0,0.18)' }, // gold, label set per-room
    singleOnly: null,
  }

  function getBadge(id) {
    if (sorted.length <= 1) return null
    const rank = sorted.findIndex(r => r.id === id) + 1
    if (rank === 1)              return BADGE_TIERS.priciest
    if (rank === sorted.length)  return BADGE_TIERS.bestDeal
    return { ...BADGE_TIERS.middle, label: `#${rank} of ${sorted.length}` }
  }

  return (
    <div className="mt-8 border-t-2 border-black/15 pt-7 animate-[fadeUp_0.4s_ease_both]">

      {/* Verdict header */}
      <div className="flex items-end justify-between mb-1">
        <div>
          <h2
            className="text-[1.7rem] text-black leading-none"
            style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.03em' }}
          >
            THE VERDICT 🔨
          </h2>
          <p className="text-[12px] text-black/40 font-medium mt-1.5">
            Here's the math. No arguing.
          </p>
        </div>
        <span className="bg-black text-warm-white text-[11px] font-bold px-3 py-1.5 rounded-lg tabular-nums flex-shrink-0 mb-0.5">
          ${totalRent.toLocaleString('en-US')}/mo
        </span>
      </div>

      {/* Result cards */}
      <div className="flex flex-col gap-3 mt-5">
        {results.map((result, i) => {
          const accent  = ACCENTS[i % ACCENTS.length]
          const badge   = getBadge(result.id)
          const diff    = result.diffFromEqual
          const diffLabel =
            diff === 0 ? '= equal split' :
            diff > 0   ? `↑ $${diff.toFixed(2)} above equal` :
                         `↓ $${Math.abs(diff).toFixed(2)} below equal`
          const barWidth = barsReady ? `${(result.percent / maxPercent) * 100}%` : '0%'

          return (
            <div
              key={result.id}
              className="border-2 border-black rounded-xl overflow-hidden shadow-[3px_3px_0_#171717] animate-[fadeUp_0.35s_ease_both]"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {/* Colored header */}
              <div
                className="px-4 py-3 flex items-center justify-between gap-2"
                style={{ background: accent.bg }}
              >
                <p
                  className="text-[13px] font-black leading-none tracking-wide"
                  style={{ color: accent.fg, fontFamily: 'Anton, sans-serif', letterSpacing: '0.05em' }}
                >
                  {result.name.toUpperCase()}
                </p>
                {badge && (
                  <span
                    className="text-[10px] font-black uppercase tracking-[0.08em] px-2.5 py-1 rounded-md flex-shrink-0"
                    style={{
                      background: badge.bg,
                      color:      badge.fg,
                      border:     `1.5px solid ${badge.border}`,
                      boxShadow:  '0 1px 3px rgba(0,0,0,0.25)',
                    }}
                  >
                    {badge.label}
                  </span>
                )}
              </div>

              {/* Card body */}
              <div className="px-4 py-4 bg-warm-white">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p className="text-[11px] text-black/45 leading-relaxed mt-1.5 max-w-[180px]">
                    {result.description}
                  </p>

                  <div className="text-right flex-shrink-0">
                    <p
                      className="text-[2.4rem] leading-none text-black tabular-nums"
                      style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}
                    >
                      <AnimatedAmount value={result.rent} />
                    </p>
                    <span
                      className="inline-block text-[10px] font-black px-2 py-0.5 rounded-md mt-1.5 tabular-nums"
                      style={{
                        background: diff > 0 ? '#C94B3218' : diff < 0 ? '#6BAE9F20' : '#17171710',
                        color:      diff > 0 ? '#C94B32'   : diff < 0 ? '#4a9080'   : '#17171760',
                      }}
                    >
                      {diffLabel}
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="h-3 bg-black/6 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width] duration-700 ease-out"
                    style={{ width: barWidth, background: accent.bg }}
                  />
                </div>
                <p className="text-[10px] font-semibold text-black/30 mt-1.5 tabular-nums">
                  {result.percent.toFixed(1)}% of total rent
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-[11px] text-black/30 text-center mt-5 font-medium">
        Adds up to exactly ${totalRent.toLocaleString('en-US')} — down to the cent.
      </p>
    </div>
  )
}

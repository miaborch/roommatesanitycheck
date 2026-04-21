import { useState } from 'react'

const ACCENTS = [
  { bg: '#C94B32', fg: '#FAF8F3', dark: true },
  { bg: '#8CB9E8', fg: '#171717', dark: false },
  { bg: '#6BAE9F', fg: '#FAF8F3', dark: true },
  { bg: '#D4A853', fg: '#171717', dark: false },
  { bg: '#9B7EC8', fg: '#FAF8F3', dark: true },
  { bg: '#E8956A', fg: '#171717', dark: false },
]

function ChevronIcon({ open, color }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-300 ease-out flex-shrink-0 ${open ? 'rotate-90' : ''}`}
      viewBox="0 0 12 12" fill="none" aria-hidden
    >
      <path d="M4.5 2.5l3.5 3.5-3.5 3.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PillGroup({ options, value, onChange, dark }) {
  const activeStyle  = dark
    ? { background: '#FAF8F3', color: '#171717', borderColor: '#FAF8F3' }
    : { background: '#171717', color: '#FAF8F3', borderColor: '#171717' }
  const inactiveBase = dark
    ? 'border-white/30 text-white/65 hover:border-white/60 hover:text-white/90'
    : 'border-black/25 text-black/55 hover:border-black/50 hover:text-black/80'

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map(opt => {
        const val    = opt.value ?? opt
        const label  = opt.label ?? opt
        const active = val === value
        return (
          <button
            key={String(val)}
            type="button"
            onClick={() => onChange(active ? null : val)}
            style={active ? activeStyle : {}}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border-2 transition-all duration-150 ${
              active ? 'scale-[1.03]' : inactiveBase
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function RatingDots({ value, onChange, max = 5, labels, dark }) {
  const filledStyle = dark
    ? { background: '#FAF8F3', color: '#171717' }
    : { background: '#171717', color: '#FAF8F3' }
  const emptyClass = dark
    ? 'bg-white/15 text-white/50 hover:bg-white/30'
    : 'bg-black/8 text-black/40 hover:bg-black/18'

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }, (_, i) => i + 1).map(n => {
        const filled = n <= (value ?? 0)
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(value === n ? null : n)}
            title={labels?.[n - 1]}
            style={filled ? filledStyle : {}}
            className={`w-8 h-8 rounded-lg text-xs font-black border-2 transition-all duration-150 ${
              filled
                ? 'border-transparent shadow-[2px_2px_0_rgba(0,0,0,0.25)] scale-105'
                : `border-transparent ${emptyClass}`
            }`}
          >
            {n}
          </button>
        )
      })}
    </div>
  )
}

function DetailGroup({ label, fg, children }) {
  return (
    <div className="flex flex-col gap-3.5">
      <p
        className="text-[9px] font-black uppercase tracking-[0.22em]"
        style={{ color: `${fg}50` }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

function DetailRow({ label, fg, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span
        className="text-[10px] font-bold uppercase tracking-[0.14em]"
        style={{ color: `${fg}75` }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

export default function RoomCard({ room, accentIndex, onChange }) {
  const [expanded, setExpanded] = useState(false)
  const accent  = ACCENTS[accentIndex % ACCENTS.length]
  const { bg, fg, dark } = accent
  const d = room.details || {}

  function updateDetail(key, val) {
    onChange({ details: { ...d, [key]: val } })
  }

  const detailCount  = Object.values(d).filter(v => v != null).length
  const inputStyle   = {
    background:  dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.09)',
    border:      `2px solid ${dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)'}`,
    color:       fg,
    outline:     'none',
  }
  const inputFocusRing = dark ? 'focus:ring-2 focus:ring-white/35' : 'focus:ring-2 focus:ring-black/20'

  return (
    <div
      className="rounded-2xl border-2 border-black shadow-[4px_4px_0_#171717] overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#171717] transition-all duration-150"
      style={{ background: bg }}
    >
      <div className="p-5 flex flex-col gap-4 flex-1">

        {/* Room number badge + name */}
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-xl border-2 text-xs font-black flex items-center justify-center flex-shrink-0 select-none"
            style={{ color: fg, borderColor: `${fg}55`, background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' }}
          >
            {accentIndex + 1}
          </span>
          <input
            type="text"
            value={room.name}
            onChange={e => onChange({ name: e.target.value })}
            className="flex-1 min-w-0 text-[15px] font-bold bg-transparent outline-none transition-colors"
            style={{ color: fg }}
            placeholder={`Bedroom ${accentIndex + 1}`}
          />
        </div>

        {/* Sq ft input */}
        <div className="relative">
          <input
            type="number"
            min="0"
            value={room.sqft || ''}
            onChange={e => onChange({ sqft: e.target.value ? Number(e.target.value) : 0 })}
            placeholder="0"
            className={`w-full text-[2.8rem] font-bold rounded-xl px-4 pt-3.5 pb-3 appearance-none transition-all duration-150 ${inputFocusRing}`}
            style={{ ...inputStyle, fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}
          />
          <span
            className="absolute right-4 bottom-3.5 text-[11px] font-bold pointer-events-none"
            style={{ color: `${fg}60` }}
          >
            sq ft
          </span>
        </div>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="flex items-center gap-2 self-start transition-all duration-150 hover:opacity-75 active:scale-95"
          style={{ color: `${fg}85` }}
        >
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }}
          >
            <ChevronIcon open={expanded} color={fg} />
          </div>
          <span className="text-[11px] font-bold">
            {expanded
              ? 'Less details'
              : detailCount > 0
                ? `${detailCount} factor${detailCount > 1 ? 's' : ''} added ✓`
                : 'Make it fairer →'}
          </span>
        </button>

        {/* Expandable details — CSS grid trick for smooth natural height */}
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <div
              className="flex flex-col gap-5 pt-4 border-t-2"
              style={{ borderColor: `${fg}18` }}
            >

              {/* Group 1: The room itself */}
              <DetailGroup label="The room" fg={fg}>
                <DetailRow label="Closet" fg={fg}>
                  <PillGroup
                    options={['small', 'medium', 'large']}
                    value={d.closet}
                    onChange={v => updateDetail('closet', v)}
                    dark={dark}
                  />
                </DetailRow>

                <DetailRow label="Windows" fg={fg}>
                  <PillGroup
                    options={[{ label: 'None', value: 0 }, { label: '1', value: 1 }, { label: '2+', value: '2+' }]}
                    value={d.windows}
                    onChange={v => updateDetail('windows', v)}
                    dark={dark}
                  />
                </DetailRow>

                <DetailRow label="Natural light" fg={fg}>
                  <RatingDots
                    value={d.naturalLight}
                    onChange={v => updateDetail('naturalLight', v)}
                    labels={['Very dark', 'Dark', 'Average', 'Bright', 'Sunny']}
                    dark={dark}
                  />
                </DetailRow>

                <DetailRow label="Layout quality" fg={fg}>
                  <RatingDots
                    value={d.layoutQuality}
                    onChange={v => updateDetail('layoutQuality', v)}
                    labels={['Awkward', 'Meh', 'OK', 'Good', 'Great']}
                    dark={dark}
                  />
                </DetailRow>
              </DetailGroup>

              {/* Separator */}
              <div className="h-px -mx-0" style={{ background: `${fg}14` }} />

              {/* Group 2: Living situation */}
              <DetailGroup label="Living situation" fg={fg}>
                <DetailRow label="Bathroom" fg={fg}>
                  <PillGroup
                    options={[{ label: 'Private', value: 'private' }, { label: 'Shared', value: 'shared' }]}
                    value={d.bathroomType}
                    onChange={v => updateDetail('bathroomType', v)}
                    dark={dark}
                  />
                  <div
                    className="grid transition-[grid-template-rows] duration-200 ease-out"
                    style={{ gridTemplateRows: d.bathroomType === 'shared' ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-2">
                        <p className="text-[10px] font-bold mb-2" style={{ color: `${fg}55` }}>
                          Sharing with how many?
                        </p>
                        <PillGroup
                          options={[{ label: '1', value: 1 }, { label: '2', value: 2 }, { label: '3+', value: '3+' }]}
                          value={d.bathroomSharedWith}
                          onChange={v => updateDetail('bathroomSharedWith', v)}
                          dark={dark}
                        />
                      </div>
                    </div>
                  </div>
                </DetailRow>

                <DetailRow label="Quietness" fg={fg}>
                  <RatingDots
                    value={d.quietness}
                    onChange={v => updateDetail('quietness', v)}
                    labels={['Very noisy', 'Noisy', 'Average', 'Quiet', 'Very quiet']}
                    dark={dark}
                  />
                </DetailRow>
              </DetailGroup>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

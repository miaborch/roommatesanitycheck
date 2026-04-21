import { useMemo, useState } from 'react'
import RoomCard from './RoomCard'
import ResultsSection from './ResultsSection'
import { calculateSplit } from '../utils/splitCalculator'

const ROOM_COUNT_OPTIONS = [2, 3, 4, 5, 6]

let _nextId = 0
function makeRoom(index) {
  return { id: _nextId++, name: `Bedroom ${index + 1}`, sqft: 0, details: {} }
}

export default function CalculatorSection() {
  const [totalRent, setTotalRent] = useState('')
  const [roomCount, setRoomCount] = useState(2)
  const [rooms, setRooms]         = useState(() => [makeRoom(0), makeRoom(1)])

  function handleRoomCountChange(count) {
    setRoomCount(count)
    setRooms(prev => {
      if (count > prev.length) {
        const added = Array.from({ length: count - prev.length }, (_, i) => makeRoom(prev.length + i))
        return [...prev, ...added]
      }
      return prev.slice(0, count)
    })
  }

  function updateRoom(id, updates) {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r))
  }

  const rent    = parseFloat(totalRent) || 0
  const results = useMemo(
    () => rent > 0 ? calculateSplit(rent, rooms) : [],
    [rent, rooms]
  )

  const gridClass =
    rooms.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
    rooms.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                         'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'

  return (
    <div id="calculator" className="bg-warm-white border-2 border-black shadow-[8px_8px_0_#171717] rounded-2xl overflow-hidden">

      {/* ── Card header ─────────────────────────────────── */}
      <div className="bg-black px-6 py-5 md:px-8 flex items-center justify-between gap-4">
        <div>
          <h2
            className="text-2xl md:text-3xl text-warm-white leading-none"
            style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.03em' }}
          >
            RUN THE NUMBERS
          </h2>
          <p className="text-[12px] text-warm-white/45 mt-1 font-medium">
            bigger room = bigger bill · no vibes, just math
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-brick-red/20 border border-brick-red/40 rounded-lg px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-brick-red" />
          <span className="text-[11px] font-bold text-brick-red uppercase tracking-widest">Splitzy</span>
        </div>
      </div>

      {/* ── Inputs row ──────────────────────────────────── */}
      <div className="px-6 py-6 md:px-8 bg-concrete/40 border-b-2 border-black flex flex-col sm:flex-row gap-5 items-end">

        {/* Rent */}
        <div className="flex-1 w-full sm:w-auto">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-black/50 mb-2">
            What's the damage?
          </label>
          <div className="relative">
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-black/30 pointer-events-none select-none"
              style={{ fontFamily: 'Anton, sans-serif' }}
            >
              $
            </span>
            <input
              type="number"
              min="0"
              value={totalRent}
              onChange={e => setTotalRent(e.target.value)}
              placeholder="2,400"
              className="w-full pl-12 pr-4 py-3.5 bg-warm-white border-2 border-black rounded-xl text-[1.8rem] font-bold text-black outline-none focus:ring-2 focus:ring-brick-red/40 transition-all duration-150 appearance-none"
              style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }}
            />
          </div>
        </div>

        {/* Bedroom count */}
        <div className="flex-shrink-0">
          <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-black/50 mb-2">
            How many of you?
          </label>
          <div className="flex gap-1.5 sm:gap-2">
            {ROOM_COUNT_OPTIONS.map(n => (
              <button
                key={n}
                type="button"
                onClick={() => handleRoomCountChange(n)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl text-sm font-black border-2 border-black transition-all duration-100 ${
                  roomCount === n
                    ? 'bg-black text-warm-white shadow-[3px_3px_0_#C94B32] -translate-y-0.5'
                    : 'bg-warm-white text-black/60 shadow-[2px_2px_0_#171717] hover:bg-concrete hover:-translate-y-px hover:shadow-[3px_3px_0_#171717]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Room cards ──────────────────────────────────── */}
      <div className="px-6 pt-6 pb-7 md:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">
            Drop in each room's size
          </span>
          <span className="text-[10px] text-black/30">· bigger = costs more, no exceptions</span>
        </div>
        <div className={`grid gap-4 ${gridClass}`}>
          {rooms.map((room, i) => (
            <RoomCard
              key={room.id}
              room={room}
              accentIndex={i}
              onChange={updates => updateRoom(room.id, updates)}
            />
          ))}
        </div>

        <ResultsSection results={results} totalRent={rent} />
      </div>
    </div>
  )
}

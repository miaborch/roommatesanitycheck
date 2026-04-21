import { useState } from 'react'

const NAV = ['Dashboard', 'Groups', 'Activity']

export default function Header({ onAdd }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40">
      <header className="bg-black border-b-2 border-black">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
          <span
            className="text-xl text-brick-red flex-shrink-0"
            style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.06em' }}
          >
            SPLITZY
          </span>

          <nav className="hidden sm:flex items-center gap-1">
            {NAV.map(item => (
              <button
                key={item}
                className="px-3 py-1.5 rounded-lg text-sm text-warm-white/50 hover:text-warm-white hover:bg-white/10 transition-all duration-150"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onAdd}
              className="bg-brick-red text-warm-white border-2 border-black px-4 py-1.5 rounded-lg text-sm font-bold shadow-[3px_3px_0_#000] hover:-translate-y-px hover:shadow-[4px_4px_0_#000] active:translate-y-px active:shadow-[1px_1px_0_#000] transition-all duration-100"
            >
              <span className="hidden sm:inline">+ Add Expense</span>
              <span className="sm:hidden">+ Add</span>
            </button>

            <button
              onClick={() => setOpen(v => !v)}
              className="sm:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px]"
              aria-label="Menu"
            >
              <span className={`block w-[18px] h-[2px] bg-warm-white rounded-full transition-all duration-200 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-[18px] h-[2px] bg-warm-white rounded-full transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-[18px] h-[2px] bg-warm-white rounded-full transition-all duration-200 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <div className={`sm:hidden overflow-hidden transition-all duration-200 bg-black border-b-2 border-black ${open ? 'max-h-48' : 'max-h-0'}`}>
        <nav className="px-5 py-2 flex flex-col">
          {NAV.map(item => (
            <button
              key={item}
              onClick={() => setOpen(false)}
              className="text-left py-3 text-sm font-medium text-warm-white/50 hover:text-warm-white border-b border-white/10 last:border-0 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

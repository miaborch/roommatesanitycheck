import { useEffect, useRef, useState } from 'react'

const CATEGORIES = ['Groceries', 'Utilities', 'Rent', 'Dining', 'Other']
const EMOJIS = { Groceries: '🛒', Utilities: '💡', Rent: '🏠', Dining: '🍕', Other: '💰' }

const INPUT_CLS = 'w-full border-2 border-black rounded-xl px-3.5 py-2.5 text-sm bg-warm-white text-black placeholder:text-black/25 focus:outline-none focus:ring-2 focus:ring-brick-red/40 transition-all duration-150'

export default function AddExpenseModal({ onAdd, onClose }) {
  const [form, setForm] = useState({ description: '', amount: '', category: 'Other', paidBy: 'You' })
  const descRef = useRef(null)

  useEffect(() => {
    const id = setTimeout(() => descRef.current?.focus(), 150)
    return () => clearTimeout(id)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.description || !form.amount) return
    onAdd({
      id:     Date.now(),
      ...form,
      amount: parseFloat(form.amount),
      emoji:  EMOJIS[form.category],
      date:   new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-end sm:items-center justify-center z-50 p-4 sm:p-6 animate-[backdropIn_0.2s_ease_both]"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-warm-white rounded-2xl border-2 border-black shadow-[8px_8px_0_#171717] w-full max-w-md max-h-[90dvh] overflow-y-auto animate-[slideUp_0.25s_cubic-bezier(0.16,1,0.3,1)_both]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b-2 border-black">
          <h2
            className="text-2xl text-black leading-none"
            style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.03em' }}
          >
            ADD EXPENSE
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center text-black/50 hover:bg-black hover:text-warm-white transition-all duration-150 shadow-[2px_2px_0_#171717] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            aria-label="Close"
          >
            <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.16em] text-black/40 mb-1.5">
              What was it?
            </label>
            <input
              ref={descRef}
              className={INPUT_CLS}
              placeholder="e.g. Whole Foods run"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-[0.16em] text-black/40 mb-1.5">
                How much?
              </label>
              <input
                type="number" min="0" step="0.01"
                className={INPUT_CLS}
                placeholder="0.00"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-[0.16em] text-black/40 mb-1.5">
                Who paid?
              </label>
              <select
                className={INPUT_CLS}
                value={form.paidBy}
                onChange={e => setForm({ ...form, paidBy: e.target.value })}
              >
                <option>You</option>
                <option>Roommate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.16em] text-black/40 mb-1.5">
              Category
            </label>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black border-2 transition-all duration-100 ${
                    form.category === cat
                      ? 'bg-brick-red text-warm-white border-brick-red shadow-[2px_2px_0_#171717] translate-y-0'
                      : 'border-black/20 text-black/50 hover:border-black/50 hover:text-black/70'
                  }`}
                >
                  {EMOJIS[cat]} {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-black rounded-xl py-2.5 text-sm font-bold text-black/50 hover:bg-black/5 hover:text-black transition-all duration-150 shadow-[2px_2px_0_#171717] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!form.description || !form.amount}
              className="flex-1 bg-brick-red text-warm-white border-2 border-black rounded-xl py-2.5 text-sm font-black shadow-[3px_3px_0_#171717] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#171717] active:translate-y-0.5 active:shadow-[1px_1px_0_#171717] transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-[3px_3px_0_#171717]"
            >
              Add Expense
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

const CATEGORY_STYLES = {
  Groceries: { bg: '#8CB9E8', text: '#171717' },
  Utilities: { bg: '#E7E4DE', text: '#171717' },
  Rent:      { bg: '#C94B32', text: '#FAF8F3' },
  Dining:    { bg: '#D4A853', text: '#171717' },
  Other:     { bg: '#171717', text: '#FAF8F3' },
}

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-14 border-2 border-dashed border-black/20 rounded-2xl">
        <p className="text-3xl mb-2">🧾</p>
        <p className="text-sm font-bold text-black/40">Nothing here yet.</p>
        <p className="text-xs text-black/25 mt-1">Add your first expense above.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2.5">
      {expenses.map(expense => {
        const cat = CATEGORY_STYLES[expense.category] ?? CATEGORY_STYLES.Other
        return (
          <li
            key={expense.id}
            className="bg-warm-white rounded-xl border-2 border-black shadow-[3px_3px_0_#171717] px-4 py-3.5 flex items-center justify-between gap-3 group hover:-translate-y-px hover:shadow-[4px_4px_0_#171717] transition-all duration-100"
          >
            {/* Left */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl flex-shrink-0 select-none">{expense.emoji}</span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-black truncate">{expense.description}</p>
                <p className="text-[11px] text-black/40 mt-0.5">
                  Paid by <span className="font-bold text-black/60">{expense.paidBy}</span> · {expense.date}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span
                className="text-[10px] px-2 py-1 rounded-lg font-black border-2 border-black"
                style={{ background: cat.bg, color: cat.text }}
              >
                {expense.category}
              </span>
              <span className="text-[15px] font-black text-black tabular-nums">
                ${expense.amount.toFixed(2)}
              </span>
              <button
                onClick={() => onDelete(expense.id)}
                className="w-7 h-7 rounded-lg border-2 border-transparent flex items-center justify-center text-black/25 hover:text-brick-red hover:border-brick-red hover:bg-brick-red/10 transition-all duration-150 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label={`Delete ${expense.description}`}
              >
                <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

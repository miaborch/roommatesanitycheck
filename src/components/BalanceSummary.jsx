const ANTON = { fontFamily: 'Anton, sans-serif', letterSpacing: '0.01em' }

export default function BalanceSummary({ expenses }) {
  const total     = expenses.reduce((sum, e) => sum + e.amount, 0)
  const yourShare = total / 2
  const count     = expenses.length

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">

      <div className="bg-warm-white rounded-xl border-2 border-black shadow-[3px_3px_0_#171717] p-4 flex flex-col gap-1">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/40">Total Spent</p>
        <p className="text-xl sm:text-2xl text-black leading-none" style={ANTON}>${total.toFixed(2)}</p>
      </div>

      <div className="bg-brick-red rounded-xl border-2 border-black shadow-[3px_3px_0_#171717] p-4 flex flex-col gap-1">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-warm-white/60">Your Share</p>
        <p className="text-xl sm:text-2xl text-warm-white leading-none" style={ANTON}>${yourShare.toFixed(2)}</p>
      </div>

      <div className="bg-sky-blue rounded-xl border-2 border-black shadow-[3px_3px_0_#171717] p-4 flex flex-col gap-1">
        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-black/45">Expenses</p>
        <p className="text-xl sm:text-2xl text-black leading-none" style={ANTON}>{count}</p>
      </div>

    </div>
  )
}

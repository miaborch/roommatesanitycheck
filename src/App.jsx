import { useState } from 'react'
import HeroSection from './components/HeroSection'
import CalculatorSection from './components/CalculatorSection'
import Header from './components/Header'
import BalanceSummary from './components/BalanceSummary'
import ExpenseList from './components/ExpenseList'
import AddExpenseModal from './components/AddExpenseModal'

const SEED_EXPENSES = [
  { id: 1, description: 'Whole Foods run', amount: 84.32, category: 'Groceries', emoji: '🛒', paidBy: 'You', date: 'Apr 18' },
  { id: 2, description: 'Electric bill', amount: 67.50, category: 'Utilities', emoji: '💡', paidBy: 'Roommate', date: 'Apr 15' },
  { id: 3, description: 'Pizza night', amount: 38.00, category: 'Dining', emoji: '🍕', paidBy: 'You', date: 'Apr 12' },
]

function LandingPage({ onGoToDashboard }) {
  return (
    <div className="bg-warm-white min-h-screen">
      <HeroSection onGoToDashboard={onGoToDashboard} />
      {/* Card overlaps the brick-red hero */}
      <div className="relative z-10 -mt-32 px-4 md:px-8 pb-16 max-w-4xl mx-auto">
        <CalculatorSection />
      </div>
    </div>
  )
}

function Dashboard() {
  const [expenses, setExpenses] = useState(SEED_EXPENSES)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-concrete">
      <Header onAdd={() => setShowModal(true)} />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1
              className="text-[2rem] text-black leading-none"
              style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.02em' }}
            >
              APRIL 2026
            </h1>
            <p className="text-[13px] text-black/45 mt-1.5 font-medium">
              Shared expenses with your roommate
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex-shrink-0 bg-brick-red text-warm-white border-2 border-black px-4 py-2 rounded-xl text-sm font-black shadow-[3px_3px_0_#171717] hover:-translate-y-px hover:shadow-[4px_4px_0_#171717] active:translate-y-0.5 active:shadow-[1px_1px_0_#171717] transition-all duration-100"
          >
            + Add Expense
          </button>
        </div>

        <BalanceSummary expenses={expenses} />
        <ExpenseList
          expenses={expenses}
          onDelete={id => setExpenses(prev => prev.filter(e => e.id !== id))}
        />
      </main>

      {showModal && (
        <AddExpenseModal
          onAdd={expense => setExpenses(prev => [expense, ...prev])}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default function App() {
  const [view, setView] = useState('landing')
  if (view === 'dashboard') return <Dashboard />
  return <LandingPage onGoToDashboard={() => setView('dashboard')} />
}

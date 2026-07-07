import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { HomePage } from './pages/HomePage'
import { LoanTypesPage } from './pages/LoanTypesPage'
import { LtvDsrPage } from './pages/LtvDsrPage'
import { CreditScoreRatePage } from './pages/CreditScoreRatePage'
import { IncreaseLimitPage } from './pages/IncreaseLimitPage'
import { DocumentChecklistPage } from './pages/DocumentChecklistPage'
import { BankComparisonPage } from './pages/BankComparisonPage'
import { DepositGuaranteePage } from './pages/DepositGuaranteePage'
import { JeonseVsMonthlyPage } from './pages/JeonseVsMonthlyPage'
import { FirstTimeGuidePage } from './pages/FirstTimeGuidePage'
import { FaqPage } from './pages/FaqPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guides/loan-types" element={<LoanTypesPage />} />
        <Route path="/guides/ltv-dsr" element={<LtvDsrPage />} />
        <Route path="/guides/credit-score-rates" element={<CreditScoreRatePage />} />
        <Route path="/guides/increase-limit" element={<IncreaseLimitPage />} />
        <Route path="/guides/document-checklist" element={<DocumentChecklistPage />} />
        <Route path="/guides/bank-comparison" element={<BankComparisonPage />} />
        <Route path="/guides/deposit-guarantee" element={<DepositGuaranteePage />} />
        <Route path="/guides/jeonse-vs-monthly" element={<JeonseVsMonthlyPage />} />
        <Route path="/guides/first-time-guide" element={<FirstTimeGuidePage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

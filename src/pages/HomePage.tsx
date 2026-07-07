import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoanForm } from '../components/LoanForm'
import { ResultCard } from '../components/ResultCard'
import { calculateLoan, type LoanCalculationInput, type LoanCalculationResult } from '../lib/loanCalculator'
import { logLoanCalculation } from '../lib/supabase'

export function HomePage() {
  const [result, setResult] = useState<LoanCalculationResult | null>(null)

  function handleSubmit(input: LoanCalculationInput) {
    const calculationResult = calculateLoan(input)
    setResult(calculationResult)

    void logLoanCalculation({
      income: input.income,
      deposit: input.deposit,
      credit_score: input.creditScore,
      estimated_limit: calculationResult.estimatedLimit,
      rate_min: calculationResult.rateBand.min,
      rate_max: calculationResult.rateBand.max,
    })
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>전세자금대출 한도 계산기</h1>
        <p>소득, 전세보증금, 신용점수를 입력하면 예상 대출 한도와 금리 구간을 확인할 수 있어요.</p>
      </header>

      <section className="calculator">
        <LoanForm onSubmit={handleSubmit} />
        {result && <ResultCard result={result} />}
      </section>

      <section className="related-guides">
        <h2>같이 보면 좋은 글</h2>
        <ul>
          <li>
            <Link to="/guides/ltv-dsr">LTV·DSR이 뭔가요? 대출 용어 완벽 정리</Link>
          </li>
          <li>
            <Link to="/guides/credit-score-rates">신용점수(NICE/KCB)별 대출 금리 차이 이해하기</Link>
          </li>
          <li>
            <Link to="/guides/increase-limit">전세자금대출 한도 늘리는 방법 5가지</Link>
          </li>
          <li>
            <Link to="/guides/document-checklist">전세자금대출 신청 서류 체크리스트</Link>
          </li>
        </ul>
      </section>
    </main>
  )
}

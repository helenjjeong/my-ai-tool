import { useState, type FormEvent } from 'react'
import { validateLoanInput, type LoanCalculationInput, type LoanInputErrors } from '../lib/loanCalculator'

interface LoanFormProps {
  onSubmit: (input: LoanCalculationInput) => void
}

const MANWON = 10_000

export function LoanForm({ onSubmit }: LoanFormProps) {
  const [incomeManwon, setIncomeManwon] = useState('')
  const [depositManwon, setDepositManwon] = useState('')
  const [creditScore, setCreditScore] = useState('')
  const [errors, setErrors] = useState<LoanInputErrors>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const input: Partial<LoanCalculationInput> = {
      income: Number(incomeManwon) * MANWON,
      deposit: Number(depositManwon) * MANWON,
      creditScore: Number(creditScore),
    }

    const validationErrors = validateLoanInput(input)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(input as LoanCalculationInput)
    }
  }

  return (
    <form className="loan-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="income">연소득 (만원)</label>
        <input
          id="income"
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="예: 5000"
          value={incomeManwon}
          onChange={(e) => setIncomeManwon(e.target.value)}
          aria-invalid={Boolean(errors.income)}
          aria-describedby={errors.income ? 'income-error' : undefined}
        />
        {errors.income && (
          <p className="field-error" id="income-error">
            {errors.income}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="deposit">전세보증금 (만원)</label>
        <input
          id="deposit"
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="예: 30000"
          value={depositManwon}
          onChange={(e) => setDepositManwon(e.target.value)}
          aria-invalid={Boolean(errors.deposit)}
          aria-describedby={errors.deposit ? 'deposit-error' : undefined}
        />
        {errors.deposit && (
          <p className="field-error" id="deposit-error">
            {errors.deposit}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="creditScore">신용점수 (NICE/KCB, 1~1000점)</label>
        <input
          id="creditScore"
          type="number"
          inputMode="numeric"
          min="1"
          max="1000"
          placeholder="예: 850"
          value={creditScore}
          onChange={(e) => setCreditScore(e.target.value)}
          aria-invalid={Boolean(errors.creditScore)}
          aria-describedby={errors.creditScore ? 'credit-score-error' : undefined}
        />
        {errors.creditScore && (
          <p className="field-error" id="credit-score-error">
            {errors.creditScore}
          </p>
        )}
      </div>

      <button type="submit" className="submit-button">
        대출 한도 계산하기
      </button>
    </form>
  )
}

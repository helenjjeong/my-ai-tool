/**
 * 전세자금대출 한도/금리 추정 로직
 *
 * 실제 은행/상품별 산식은 공개되어 있지 않고 상품마다 다르므로,
 * 아래는 일반적으로 알려진 기준(LTV, DSR)을 단순화한 "참고용" 추정치다.
 * - LTV 기준: 전세보증금의 80%까지
 * - DSR 기준: 연소득의 40%를 연간 상환 여력으로 가정 (전세대출 다수가
 *   만기일시상환/이자만 납부 방식이므로, 금리 구간의 상단 금리로
 *   연이자만 낸다고 가정해 역산 — 보수적으로 낮은 한도가 나오도록 함)
 * - 두 기준 중 더 낮은 금액을 한도로 채택하고, 프로그램 상한(5억원)을 넘지 않도록 캡
 */

const LTV_RATIO = 0.8
const DSR_RATIO = 0.4
const MAX_PROGRAM_LIMIT = 500_000_000
const ROUND_UNIT = 1_000_000

export interface LoanCalculationInput {
  /** 연소득 (원) */
  income: number
  /** 전세보증금 (원) */
  deposit: number
  /** NICE/KCB 신용점수 (1~1000) */
  creditScore: number
}

export interface RateBand {
  min: number
  max: number
}

export interface LoanCalculationResult {
  estimatedLimit: number
  rateBand: RateBand
  breakdown: {
    ltvBasedLimit: number
    incomeBasedLimit: number
    cappedByMaxProgramLimit: boolean
  }
}

export function getRateBand(creditScore: number): RateBand {
  if (creditScore >= 900) return { min: 3.5, max: 4.0 }
  if (creditScore >= 800) return { min: 4.0, max: 4.5 }
  if (creditScore >= 700) return { min: 4.5, max: 5.2 }
  if (creditScore >= 600) return { min: 5.2, max: 6.0 }
  if (creditScore >= 500) return { min: 6.0, max: 7.5 }
  return { min: 7.5, max: 9.0 }
}

export function calculateLoan(input: LoanCalculationInput): LoanCalculationResult {
  const { income, deposit, creditScore } = input
  const rateBand = getRateBand(creditScore)

  if (income <= 0 || deposit <= 0) {
    return {
      estimatedLimit: 0,
      rateBand,
      breakdown: { ltvBasedLimit: 0, incomeBasedLimit: 0, cappedByMaxProgramLimit: false },
    }
  }

  const ltvBasedLimit = deposit * LTV_RATIO
  const annualRepaymentCapacity = income * DSR_RATIO
  const incomeBasedLimit = annualRepaymentCapacity / (rateBand.max / 100)

  const rawLimit = Math.min(ltvBasedLimit, incomeBasedLimit, MAX_PROGRAM_LIMIT)
  const estimatedLimit = Math.max(0, Math.floor(rawLimit / ROUND_UNIT) * ROUND_UNIT)

  return {
    estimatedLimit,
    rateBand,
    breakdown: {
      ltvBasedLimit,
      incomeBasedLimit,
      cappedByMaxProgramLimit: rawLimit >= MAX_PROGRAM_LIMIT,
    },
  }
}

export interface LoanInputErrors {
  income?: string
  deposit?: string
  creditScore?: string
}

export function validateLoanInput(input: Partial<LoanCalculationInput>): LoanInputErrors {
  const errors: LoanInputErrors = {}

  if (input.income === undefined || Number.isNaN(input.income) || input.income <= 0) {
    errors.income = '연소득을 0보다 큰 숫자로 입력해주세요.'
  }

  if (input.deposit === undefined || Number.isNaN(input.deposit) || input.deposit <= 0) {
    errors.deposit = '전세보증금을 0보다 큰 숫자로 입력해주세요.'
  }

  if (
    input.creditScore === undefined ||
    Number.isNaN(input.creditScore) ||
    input.creditScore < 1 ||
    input.creditScore > 1000
  ) {
    errors.creditScore = '신용점수는 1~1000 사이의 숫자로 입력해주세요.'
  }

  return errors
}

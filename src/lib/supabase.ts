import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export interface LoanCalculationLog {
  income: number
  deposit: number
  credit_score: number
  estimated_limit: number
  rate_min: number
  rate_max: number
}

export async function logLoanCalculation(log: LoanCalculationLog) {
  if (!supabase) {
    console.warn('Supabase가 설정되지 않아 사용 로그를 저장하지 않습니다.')
    return
  }

  const { error } = await supabase.from('usage_logs').insert({
    income: log.income,
    deposit: log.deposit,
    credit_score: log.credit_score,
    estimated_limit: log.estimated_limit,
    rate_min: log.rate_min,
    rate_max: log.rate_max,
  })

  if (error) {
    console.error('사용 로그 저장 실패:', error.message)
  }
}

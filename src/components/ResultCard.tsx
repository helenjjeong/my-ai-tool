import type { LoanCalculationResult } from '../lib/loanCalculator'
import { formatKRW } from '../lib/format'

interface ResultCardProps {
  result: LoanCalculationResult
}

// TODO: 제휴 대출상품 페이지가 준비되면 이 핸들러를 실제 링크 이동으로 교체
function handleShowMoreProducts() {
  console.info('대출상품 더 보기: 제휴 링크 연결 예정')
}

export function ResultCard({ result }: ResultCardProps) {
  const { estimatedLimit, rateBand } = result

  return (
    <div className="result-card">
      <div className="result-row">
        <span className="result-label">예상 대출 한도</span>
        <span className="result-value">{formatKRW(estimatedLimit)}</span>
      </div>

      <div className="result-row">
        <span className="result-label">예상 금리 구간</span>
        <span className="result-value">
          연 {rateBand.min.toFixed(1)}% ~ {rateBand.max.toFixed(1)}%
        </span>
      </div>

      <button type="button" className="more-products-button" onClick={handleShowMoreProducts}>
        대출상품 더 보기
      </button>

      <p className="disclaimer">
        본 계산 결과는 보증금 대비 담보인정비율(LTV)과 소득 대비 상환능력(DSR)에 대한
        일반적인 가정을 기반으로 산출한 <strong>참고용 추정치</strong>입니다. 실제 대출 가능
        여부, 한도, 금리는 금융회사와 상품, 심사 결과에 따라 달라질 수 있으며 본 결과와 다를
        수 있습니다. 정확한 조건은 반드시 금융회사 상담을 통해 확인하세요.
      </p>
    </div>
  )
}

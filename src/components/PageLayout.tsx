import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PageLayoutProps {
  title: string
  children: ReactNode
}

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <article className="content-page">
      <h1>{title}</h1>
      <div className="content-body">{children}</div>

      <div className="content-cta">
        <p>내 소득과 보증금 기준 예상 한도가 궁금하다면 계산기로 바로 확인해보세요.</p>
        <Link to="/" className="cta-button">
          전세자금대출 한도 계산기 사용해보기
        </Link>
      </div>

      <p className="disclaimer">
        본 콘텐츠는 일반적으로 알려진 정보를 바탕으로 한 <strong>참고용 설명</strong>이며, 특정
        금융회사나 상품을 추천하지 않습니다. 제도와 금리, 한도 기준은 수시로 바뀔 수 있으므로
        실제 신청 전 반드시 해당 금융회사 또는 주택도시기금·HUG 등 관련 기관에 최신 내용을
        확인하세요.
      </p>
    </article>
  )
}

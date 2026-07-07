export interface PageMeta {
  path: string
  navLabel: string
  title: string
  description: string
}

export const homePage: PageMeta = {
  path: '/',
  navLabel: '한도 계산기',
  title: '전세자금대출 한도 계산기',
  description: '소득, 전세보증금, 신용점수로 예상 대출 한도와 금리 구간을 계산합니다.',
}

export const contentPages: PageMeta[] = [
  {
    path: '/guides/loan-types',
    navLabel: '대출 종류',
    title: '전세자금대출 종류 총정리 (버팀목·디딤돌·은행 일반전세대출 비교)',
    description: '정책 전세자금대출과 시중은행 일반 전세자금대출의 차이를 비교합니다.',
  },
  {
    path: '/guides/ltv-dsr',
    navLabel: 'LTV·DSR',
    title: 'LTV·DSR이 뭔가요? 대출 용어 완벽 정리',
    description: '전세자금대출을 이해하는 데 꼭 필요한 LTV, DSR, DTI 등 용어를 정리합니다.',
  },
  {
    path: '/guides/credit-score-rates',
    navLabel: '신용점수·금리',
    title: '신용점수(NICE/KCB)별 대출 금리 차이 이해하기',
    description: '신용점수 구간에 따라 대출 금리가 어떻게 달라지는지 설명합니다.',
  },
  {
    path: '/guides/increase-limit',
    navLabel: '한도 늘리기',
    title: '전세자금대출 한도 늘리는 방법 5가지',
    description: '대출 한도를 높이기 위해 점검해볼 수 있는 실질적인 방법을 소개합니다.',
  },
  {
    path: '/guides/document-checklist',
    navLabel: '서류 체크리스트',
    title: '전세자금대출 신청 서류 체크리스트',
    description: '전세자금대출 신청 시 미리 준비하면 좋은 서류 목록을 정리합니다.',
  },
  {
    path: '/guides/bank-comparison',
    navLabel: '은행별 비교',
    title: '은행별 전세자금대출 금리·한도 비교',
    description: '은행별 전세자금대출을 비교할 때 확인해야 할 체크포인트를 안내합니다.',
  },
  {
    path: '/guides/deposit-guarantee',
    navLabel: '반환보증',
    title: '전세보증금 반환보증이란? 꼭 필요한 이유',
    description: '전세보증금 반환보증의 개념과 필요성, 가입 방법을 설명합니다.',
  },
  {
    path: '/guides/jeonse-vs-monthly',
    navLabel: '전세 vs 월세',
    title: '전세대출 vs 월세대출, 뭐가 유리할까',
    description: '전세대출과 월세대출의 장단점을 비교해 상황별 선택 기준을 제시합니다.',
  },
  {
    path: '/guides/first-time-guide',
    navLabel: '첫 전세 가이드',
    title: '첫 전세 계약자를 위한 대출 가이드',
    description: '처음 전세 계약을 하는 사람이 놓치기 쉬운 체크포인트를 안내합니다.',
  },
  {
    path: '/faq',
    navLabel: 'FAQ',
    title: '자주 묻는 질문(FAQ)',
    description: '전세자금대출 한도 계산기와 전세자금대출에 대해 자주 묻는 질문을 모았습니다.',
  },
]

export const allPages: PageMeta[] = [homePage, ...contentPages]

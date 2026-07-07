# 전세자금대출 한도 계산기

소득, 전세보증금, 신용점수를 입력하면 예상 대출 한도와 금리 구간을 보여주는
참고용 계산기. Vite + React + TypeScript로 만들었고, 사용 로그는 Supabase에
저장, Vercel로 배포한다.

> 계산 결과는 LTV(보증금의 80%)와 DSR(소득의 40%) 가정을 기반으로 한
> **참고용 추정치**다. 실제 대출 한도/금리는 은행·상품·심사 결과에 따라
> 다르다. 로직 세부사항은 `src/lib/loanCalculator.ts` 상단 주석 참고.

## 로컬 개발

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 타입체크 + 프로덕션 빌드
```

## Supabase 설정 (사용 로그 저장)

1. [supabase.com](https://supabase.com)에서 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 실행 → `usage_logs` 테이블 생성
   (RLS로 anon 키는 insert만 가능, 조회/수정/삭제 불가)
3. 프로젝트 Settings → API에서 Project URL과 anon public key 확인
4. `.env.example`을 복사해 `.env` 생성 후 값 채우기:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxx
   ```

   env가 비어 있으면 계산 자체는 정상 동작하고 로그 저장만 건너뛴다
   (콘솔에 경고만 출력).

## Vercel 배포 (GitHub 연동, git push 자동배포)

1. 이 저장소를 GitHub에 push
   ```bash
   git remote add origin <저장소 URL>
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com)에서 New Project → 방금 push한 GitHub
   저장소 선택 (Framework Preset: Vite 자동 인식)
3. Vercel 프로젝트의 Environment Variables에 아래 값 등록
   (Production/Preview 모두):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy 클릭 → 이후로는 `git push origin main` 할 때마다 Vercel이
   자동으로 빌드/배포한다. 별도로 Vercel CLI를 실행할 필요 없음.

## 대출상품 더 보기 버튼

`src/components/ResultCard.tsx`의 `handleShowMoreProducts`가 현재는
콘솔 로그만 남기는 placeholder다. 제휴 링크가 정해지면 이 핸들러를
실제 이동(`window.location.href` 또는 `<a href>`)으로 교체하면 된다.

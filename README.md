# Green Community Front

Next.js App Router 기반 커뮤니티 프런트엔드입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

## 폴더 구조

```text
src/
├─ app/          # App Router 페이지, 레이아웃, Route Handler
├─ components/   # 화면 및 도메인별 React 컴포넌트
│  ├─ auth/
│  ├─ common/
│  ├─ community/
│  ├─ home/
│  ├─ layout/
│  ├─ post/
│  └─ providers/
├─ contexts/     # React Context
├─ hooks/        # 공용 커스텀 훅
├─ lib/          # API 클라이언트, 유틸리티, 서버 전용 코드
│  ├─ server/
│  └─ utils/
├─ stores/       # 전역 상태 저장소
└─ types/        # 공용 타입

public/
└─ images/       # 정적 이미지
```

특정 기능에서만 사용하는 코드는 해당 도메인 폴더에 두고, 여러 기능에서 재사용할 때만 공용 폴더로 이동합니다.

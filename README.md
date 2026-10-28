# Green Community Front

Next.js App Router 기반 커뮤니티 프런트엔드입니다.

## Docker 없이 실행

백엔드의 MySQL과 Redis 연결을 먼저 준비하고, `community-backend`에서 실행합니다.

```bash
poetry run alembic upgrade head
poetry run uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

프런트엔드 폴더에서 `.env.example`을 `.env.local`로 복사합니다. 기본값은 다음과 같습니다.

```dotenv
BACKEND_API_URL=http://127.0.0.1:8000/api/v1
```

이 주소는 Next.js 서버에서만 사용합니다. 브라우저는 같은 출처의 `/api/backend`로 요청하므로 별도 CORS 설정이 필요하지 않습니다.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

백엔드 상태는 [준비 상태](http://127.0.0.1:8000/health/ready)에서 확인합니다. MySQL과 Redis가 모두 `ok`여야 합니다.

## 연결된 기능

- 회원가입, 로그인, 자동 세션 갱신, 로그아웃, 내 정보 및 닉네임 변경
- 게시글 목록과 페이지 이동, 상세 조회, 작성·수정·삭제
- 댓글과 답글 조회·작성·수정·삭제, 좋아요, 실제 게시글 링크 복사
- 이미지 업로드 및 첨부 이미지 조회, 등록된 커뮤니티 메뉴 조회

인증 토큰은 HttpOnly 쿠키로 보관하며, 브라우저 JavaScript나 localStorage에 노출하지 않습니다. 로그인·회원가입 화면만 공개하며 커뮤니티 전체 화면과 서비스 API(메뉴·댓글·답글 포함)는 로그인이 필요합니다. 세션 만료 시 로그인 화면으로 이동하고, 로그인 후 원래 요청한 화면으로 돌아갑니다. 로컬에서는 프런트엔드 주소의 `localhost`와 `127.0.0.1` 중 하나를 일관되게 사용하세요. 두 주소의 쿠키는 서로 다릅니다.

회원가입 시 닉네임 앞뒤 공백을 제거하고 비밀번호 확인을 검증합니다. 비밀번호는 8자 이상, UTF-8 기준 72바이트 이내입니다(한글·이모지는 한 글자가 여러 바이트). 가입 후 자동 로그인하며, 로그인만 실패한 경우 같은 폼에서 가입을 반복하지 않고 로그인을 재시도합니다. 로그인·로그아웃·토큰 갱신은 같은 세션 잠금을 사용합니다.

현재 백엔드에는 게시글과 게시판을 연결하는 필드가 없어 전체 게시글만 제공합니다. 태그·북마크·인기글 정렬처럼 대응 API가 없는 기능에는 임시 데이터를 표시하지 않습니다. 다른 회원의 댓글 이름은 백엔드 응답에 닉네임이 없어 `회원 번호`로 표시합니다.

이미지 첨부에는 백엔드의 S3 또는 R2 설정이 필요합니다. 스토리지 없이도 인증·게시글·댓글은 동작합니다. 이미지는 게시글 저장 후 상세 화면에서 한 장씩, 최대 10MB까지 첨부할 수 있습니다.

## 검증

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

백엔드의 Docker 없는 통합 테스트 실행법은 `community-backend/RUNNING.md`를 참고하세요.

실제 브라우저로 인증을 재검증할 때는 임시 Docker MySQL·Redis를 사용하는 테스트 서버를 실행할 수 있습니다. 기존 개발 DB에는 테스트 계정을 만들지 않습니다.

```bash
# 백엔드 폴더의 터미널 (Docker 실행 필요)
poetry run python -m tests.manual_auth_server

# 프런트엔드 폴더의 별도 터미널
npm run build
npm run test:serve
```

`http://127.0.0.2:3001/signup`에서 가입 → 자동 로그인 → 새로고침 → 로그아웃 → 재로그인을 확인합니다. 테스트 Next 서버는 `127.0.0.1:8001`의 백엔드로만 연결합니다. 테스트 전용 호스트와 JWT 서명 키를 사용하여 개발 사이트의 쿠키·인증과 분리합니다. 검증이 끝나면 두 터미널에서 Ctrl+C로 종료하며 임시 DB·Redis 컨테이너도 정리됩니다.

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

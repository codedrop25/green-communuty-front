# Green Community 디자인 가이드 (v1.0)

> 기준 시안: `design-samples/board/C1-clean-light.html` (C1 · 클린 라이트)
> 비주얼 레퍼런스: `design-samples/board/design-guide.html`
> 대상: Next.js 16 + Tailwind CSS v4 (`src/app/globals.css`의 `@theme`)

---

## 1. 디자인 원칙

| 원칙 | 의미 | 실무 규칙 |
|---|---|---|
| **조용한 UI, 선명한 콘텐츠** | 화면의 주인공은 글이다. UI는 뒤로 물러난다. | 색은 뉴트럴(zinc) 중심, 브랜드 그린은 “상태·확정”에만 쓴다. |
| **선(border)으로 구분, 그림자는 최소** | 면 분리는 1px 보더와 여백으로 한다. | 그림자는 “선택된 것”(활성 탭·활성 메뉴)에만 `shadow-sm`. |
| **밀도 있게, 그러나 숨 쉬게** | 한 화면에 많은 글을 보여주되 답답하지 않게. | 본문 UI 14px, 행 높이 64px 내외, 4px 그리드 준수. |
| **예측 가능한 일관성** | 같은 역할은 같은 모양. | 이 문서에 없는 스타일은 먼저 컴포넌트를 확장하고 문서를 갱신한다. |

---

## 2. 컬러

### 2.1 시맨틱 토큰 (코드에서는 이 이름만 사용)

| 토큰 | Tailwind 기준값 | HEX | 용도 |
|---|---|---|---|
| `surface` | white | `#ffffff` | 기본 배경, 카드·리스트 배경 |
| `surface-subtle` | zinc-50 | `#fafafa` | 좌측 내비 배경, 테이블 헤더, 공지 행, row hover |
| `surface-muted` | zinc-100 | `#f4f4f5` | 세그먼트 탭 트랙, 태그 칩, ghost hover |
| `border` | zinc-200 | `#e4e4e7` | 컨테이너·입력창·구분선 |
| `border-subtle` | zinc-100 | `#f4f4f5` | 리스트 행 사이 divider |
| `border-strong` | zinc-400 | `#9f9fa9` | 입력창 focus 보더 |
| `fg` | zinc-900 | `#18181b` | 제목, 강조 텍스트 (17.7:1) |
| `fg-body` | zinc-700 | `#3f3f46` | 본문, 댓글 (10.4:1) |
| `fg-secondary` | zinc-600 | `#52525c` | 보조 텍스트, 비활성 메뉴 (7.7:1) |
| `fg-muted` | zinc-500 | `#71717b` | 메타 정보(작성자·시간·조회), 캡션 (4.8:1) |
| `fg-subtle` | zinc-400 | `#9f9fa9` | **텍스트 금지.** 아이콘·placeholder·구분 기호 전용 (2.6:1) |
| `primary` | zinc-900 | `#18181b` | 기본 CTA 버튼 배경 (새 글 작성, 댓글 등록) |
| `primary-hover` | zinc-700 | `#3f3f46` | |
| `brand` | green-700 | `#008236` | 브랜드 확정 액션(게시하기), 브랜드 텍스트 (4.95:1) |
| `brand-hover` | green-800 | `#016630` | |
| `brand-soft` | green-50 | `#f0fdf4` | 브랜드 배경 틴트 (추천 버튼, 공지 배지 배경) |
| `brand-strong` | green-500 | `#00c950` | **텍스트 금지.** 온라인 점·진행바 등 그래픽 전용 |
| `danger` | red-600 | `#e7000b` | 삭제·에러 |

> ⚠️ **C1 시안 대비 변경점 (접근성)**
> - 메타 텍스트 `zinc-400` → `zinc-500` (2.6:1 → 4.8:1, WCAG AA 충족)
> - 브랜드 텍스트·버튼 `green-600` → `green-700` (3.2:1 → 4.95:1)

### 2.2 브랜드 컬러 사용 규칙

- **한 화면에 브랜드 솔리드 버튼은 최대 1개.** 글쓰기 화면의 “게시하기”처럼 콘텐츠를 발행·확정하는 최종 액션에만 쓴다.
- 일반 CTA(새 글 작성, 등록, 저장)는 `primary`(zinc-900)를 쓴다.
- 그 외 브랜드 그린은 **상태 표시**에만 쓴다. 대상은 NEW 라벨, 접속 중 표시, 추천한 상태, 공지 배지다.

### 2.3 카테고리 컬러

카테고리는 **6~8px 점(dot)** 으로만 표현하고, 옆에 반드시 텍스트 라벨을 붙인다. 색만으로 의미를 전달하지 않는다.

| 게시판 | 토큰 | 값 |
|---|---|---|
| 전체 | `cat-all` | zinc-400 `#9f9fa9` |
| 자유게시판 | `cat-free` | green-500 `#00c950` |
| 질문답변 | `cat-qna` | sky-500 `#00a6f4` |
| 정보공유 | `cat-info` | amber-500 `#fe9a00` |
| 후기 | `cat-review` | violet-500 `#8e51ff` |

게시판이 추가되면 Tailwind 500 단계 중 기존 색과 색상환 45° 이상 떨어진 색을 쓴다(rose, teal, orange 순서).

---

## 3. 타이포그래피

**서체:** Pretendard Variable (한글·영문 공용). 코드 블록만 Geist Mono.

| 스타일 | size / line-height | weight | 기타 | 용도 |
|---|---|---|---|---|
| `title-lg` | 24 / 32 (`text-2xl`) | 600 | `tracking-tight` | 게시글 상세 제목 |
| `title` | 20 / 28 (`text-xl`) | 600 | `tracking-tight` | 페이지 제목 (게시판명, 새 글 작성) |
| `heading` | 16 / 24 (`text-base`) | 600 | | 섹션 제목 (댓글 18) |
| `body-lg` | 15 / 28 (`text-[15px] leading-7`) | 400 | | 게시글 본문 |
| `body` | **14 / 20 (기본값)** | 400·500 | | 리스트 제목(500), 댓글, 일반 UI |
| `ui` | 13 / 18 (`text-[13px]`) | 400·500 | | 버튼, 탭, 내비, 브레드크럼, 폼 라벨 |
| `meta` | 12 / 16 (`text-xs`) | 400 | `fg-muted` | 작성자·시간·조회수, 헬퍼 텍스트 |
| `label` | 11 / 16 (`text-[11px]`) | 600 | | 배지(공지·NEW), 사이드바 섹션 라벨 |

- 굵기는 **400 / 500 / 600 세 가지만** 쓴다. 700 이상은 쓰지 않는다.
- 문단 최대 폭은 약 720px(`max-w-prose` 수준)이다. 상세 본문이 너무 길게 늘어지지 않게 한다.
- 숫자 컬럼(조회·추천)은 `tabular-nums`로 자릿수를 정렬하고 오른쪽 정렬한다.

---

## 4. 레이아웃 & 스페이싱

### 4.1 그리드

- **4px 기본 단위.** 허용 간격은 4·6·8·10·12·16·20·24·32·40이다(Tailwind 1~10).
- 컴포넌트 내부는 8·12, 컴포넌트 사이는 16·24, 섹션 사이는 32·40을 쓴다.

### 4.2 앱 셸 구조

```
┌────────────┬──────────────────────────────────────────────┐
│ Sidebar    │ Topbar (h-14, sticky, 브레드크럼 + 액션)       │
│ w-60       ├───────────────────────────────┬──────────────┤
│ sticky     │ Main (flex-1)                 │ Right rail   │
│ h-screen   │ max-w-6xl · px-6 · py-8       │ w-[260px]    │
│ bg-subtle  │                               │ xl 이상 노출  │
│ border-r   │                               │              │
└────────────┴───────────────────────────────┴──────────────┘
```

| 영역 | 규격 |
|---|---|
| Sidebar | 폭 240px, 로고 영역 h-14, 좌우 패딩 12px, 하단 프로필 고정 |
| Topbar | 높이 56px, `bg-white/90 backdrop-blur`, 하단 보더 |
| Main 컨테이너 | 최대 1152px, 좌우 24px, 상하 32px |
| Main ↔ Right rail | 간격 40px (`gap-10`) |
| Right rail | 폭 260px, 섹션 간격 32px, 카드 없이 라벨 + 콘텐츠 구조 |

### 4.3 반응형

| 구간 | 폭 | 동작 |
|---|---|---|
| Mobile | < 640 | 1단. Topbar에 로고 + ☰ 버튼, Sidebar는 **드로어**로 연다. 리스트 우측 수치 칼럼은 숨긴다. |
| Tablet | 640–1023 | 1단 + 리스트 수치 칼럼을 노출한다. Sidebar는 드로어. |
| Desktop | 1024–1279 (`lg`) | Sidebar 고정 + Main 2단 |
| Wide | ≥ 1280 (`xl`) | Sidebar + Main + Right rail 3단 |

> C1 시안에는 모바일 드로어가 없다. 구현할 때 `layout/MobileNavDrawer`로 추가한다.

---

## 5. 형태 (Radius · Border · Elevation)

| 토큰 | 값 | 적용 |
|---|---|---|
| `radius-sm` | 4px (`rounded`) | 배지, 태그 칩, kbd |
| `radius-md` | 6px (`rounded-md`) | 버튼, 입력창, 내비 아이템, 세그먼트 버튼 |
| `radius-lg` | 8px (`rounded-lg`) | 리스트 컨테이너, 에디터, 세그먼트 트랙, 스탯 타일 |
| `radius-full` | 9999px | 아바타, 상태 점 |
| 보더 | 1px `border` | 모든 컨테이너 기본 |
| `shadow-xs` | | 검색 입력(사이드바) |
| `shadow-sm` | | **선택 상태 전용**: 활성 세그먼트, 활성 게시판 메뉴(+ `ring-1 ring-zinc-200`) |

그림자로 카드를 띄우지 않는다. 떠 있는 레이어(드롭다운, 모달, 토스트)만 `shadow-lg`를 쓴다.

---

## 6. 아이콘

- 라이브러리는 **lucide-react**를 권장한다. 시안의 유니코드 기호는 임시다.
- 크기는 16px(기본 UI), 14px(메타·인라인), 20px(Topbar 액션)을 쓴다. stroke는 1.75다.
- 색은 인접 텍스트 색을 상속한다(`currentColor`).
- 아이콘만 있는 버튼은 반드시 `aria-label`을 단다. 클릭 영역은 최소 32×32px이다.

| 의미 | lucide |
|---|---|
| 홈 피드 / 인기 / 북마크 / 내 활동 | `Home` / `TrendingUp` / `Bookmark` / `History` |
| 검색 / 알림 / 설정 / 필터 | `Search` / `Bell` / `Settings` / `SlidersHorizontal` |
| 추천 / 댓글 / 조회 | `ChevronUp` / `MessageSquare` / `Eye` |
| 더보기 / 링크 복사 | `MoreHorizontal` / `Link` |

---

## 7. 인터랙션 상태

| 상태 | 규칙 |
|---|---|
| Hover | 리스트 행 `bg-zinc-50`, 내비·ghost 버튼 `bg-zinc-100`, 솔리드 버튼은 한 단계 진하거나 밝게 |
| Focus (키보드) | 모든 인터랙티브 요소에 `focus-visible:outline-2 outline-offset-2 outline-zinc-900`을 준다. 입력창은 `focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100`을 쓴다. |
| Active / Selected | `bg-white shadow-sm ring-1 ring-zinc-200` + `font-medium text-fg` |
| Disabled | `opacity-50 cursor-not-allowed`, hover 효과를 끈다 |
| Loading | 버튼은 라벨을 유지하고 앞에 스피너 14px를 붙인다. 리스트는 스켈레톤 행 5개를 보여준다. |
| 트랜지션 | `transition-colors duration-150` 만 사용. 레이아웃 이동 애니메이션 금지 |

---

## 8. 컴포넌트

### 8.1 Button — `components/common/Button.tsx`

| variant | 스타일 | 용도 |
|---|---|---|
| `primary` | `bg-zinc-900 text-white hover:bg-zinc-700` | 기본 CTA |
| `brand` | `bg-green-700 text-white hover:bg-green-800` | 발행·확정 (화면당 1개) |
| `secondary` | `border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50` | 임시저장, 이전/다음 |
| `ghost` | `text-zinc-600 hover:bg-zinc-100` | 취소, 아이콘 버튼 |
| `danger` | `text-red-600 hover:bg-red-50` | 삭제 (확인 모달 필수) |

| size | 높이 | 패딩 | 폰트 |
|---|---|---|---|
| `sm` | 28px (`h-7`) | `px-2.5` | 13px / 500 |
| `md` (기본) | 32px (`h-8`) | `px-3` | 13px / 500 |
| `lg` | 40px (`h-10`) | `px-4` | 14px / 500 (모바일 하단 고정 CTA) |

```ts
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "brand" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
};
```

### 8.2 Input / Textarea / Select — `components/common/`

- 높이 36px(`py-2`), `rounded-md border border-zinc-200 px-3`, 14px.
- 라벨은 상단에 13px / 500 / `fg-body`, 간격 6px로 둔다. 헬퍼·에러는 하단 12px에 둔다(에러는 `text-red-600`).
- placeholder는 `fg-subtle`로 두고, 예시 문장 대신 무엇을 입력할지 적는다.
- 에러 상태는 `border-red-500 ring-4 ring-red-50`에 `aria-invalid`와 `aria-describedby`를 연결한다.

### 8.3 SegmentedTabs — `components/common/SegmentedTabs.tsx`

- 트랙은 `inline-flex rounded-lg bg-zinc-100 p-0.5`로 만든다.
- 아이템은 `rounded-md px-3 py-1 text-[13px]`로 만들고, 선택된 아이템은 `bg-white font-medium shadow-sm`, 나머지는 `text-zinc-500`이다.
- 정렬·필터처럼 **같은 목록을 다른 기준으로 보는 경우**에만 쓴다. 페이지 이동 탭으로 쓰지 않는다.
- 접근성: `role="tablist"`, 각 아이템 `role="tab" aria-selected`.

### 8.4 Badge

| 종류 | 스타일 |
|---|---|
| 공지 | `rounded bg-green-50 px-1.5 py-0.5 text-[11px] font-semibold text-green-700` |
| NEW | `text-[11px] font-semibold text-green-700` (배경 없음) |
| 카테고리(상세) | `rounded border border-zinc-200 px-1.5 py-0.5 text-[11px] text-zinc-600` |
| 태그 칩 | `rounded border border-zinc-200 px-2 py-0.5 text-xs text-zinc-600` |

### 8.5 Avatar — `components/common/Avatar.tsx`

- 크기는 24(메타 인라인), 28(댓글·프로필), 32(Topbar)이다.
- 이미지가 없으면 닉네임 첫 글자를 넣는다. 배경은 `bg-zinc-100`(본인만 `bg-green-100 text-green-800`), 글자는 11px / 600이다.

### 8.6 Sidebar Nav — `components/layout/Sidebar.tsx`, `components/community/BoardNav.tsx`

- 아이템: `flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[14px]`
- 기본 `text-zinc-600`, hover `bg-zinc-100`, 활성 `bg-white font-medium text-zinc-900 shadow-sm ring-1 ring-zinc-200` (피드 그룹의 활성은 `bg-zinc-200/60`)
- 게시판 아이템: 앞에 카테고리 dot(8px), 뒤에 글 수 `ml-auto text-xs text-zinc-500 tabular-nums`
- 섹션 라벨: 12px / 500 / `fg-muted`, 위 간격 20px

### 8.7 PostListItem — `components/post/PostListItem.tsx`

```
[●] 제목 텍스트 (truncate, 14/500, fg)  NEW          ▲ 42   💬 18   214
    정보공유 · 초록손 · 10분 전  (12, fg-muted)
```

- 행 패딩은 `px-4 py-3`, 구분은 `divide-y divide-zinc-100`, hover는 `bg-zinc-50`이다.
- 제목은 한 줄로 말줄임한다. 행 전체를 `<Link>`로 감싸고 중첩 버튼은 넣지 않는다.
- 우측 수치는 추천(w-10)·댓글(w-10)·조회(w-14) 순서로 두고, `text-xs fg-muted tabular-nums text-right`로 맞춘다. 640px 미만에서는 숨긴다.
- 추천 100 이상이나 조회 1,000 이상이어도 색을 바꾸지 않는다. 인기글 표시는 “인기” 탭에서 한다.

```ts
type PostSummary = {
  id: number;
  boardId: BoardId;
  title: string;
  author: { id: string; nickname: string; avatarUrl?: string };
  createdAt: string;      // ISO — 표시 시 상대시간 유틸로 변환
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isNew: boolean;
  hasImage: boolean;
};
```

### 8.8 NoticeRow

리스트 컨테이너 최상단에 둔다. `bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 text-[13px]`, 공지 배지 + 제목(500)이다. 공지는 최대 2개까지 두고, 3개 이상이면 “공지 더보기”로 접는다.

### 8.9 Pagination

- 리스트 하단에 `1–10 / 1,284`(12px, fg-muted)와 `secondary sm` 이전/다음 버튼을 둔다.
- 번호형 페이지네이션은 쓰지 않는다. 필요하면 커서 기반 “다음”으로 확장한다.

### 8.10 Post Detail — `components/post/PostDetail.tsx`

- 순서: 뒤로가기 링크(13px) → 제목(title-lg) → 메타 행(아바타 24 + 작성자 500 + 시간·조회 + 카테고리 배지 + ⋯ 메뉴) → 본문(body-lg, 위 간격 32px) → 액션(추천·저장·링크 복사) → 댓글.
- 추천 버튼은 추천하지 않은 상태가 `secondary`이고, 추천한 상태는 `border-green-700/30 bg-green-50 text-green-700`이다.
- 본문 이미지는 `rounded-lg border border-zinc-200`, 최대 폭 100%로 둔다.

### 8.11 Comment — `components/post/CommentList.tsx`, `CommentItem.tsx`

- 입력창은 textarea 2줄에 우하단 `primary sm` “등록”을 둔다. 포커스하면 보더를 `zinc-400`으로 바꾼다.
- 아이템은 아바타 28 + (작성자 13/500, 시간 12 fg-muted) + 본문 14 fg-body + 액션(추천·답글) 12다.
- 대댓글은 **1단계만** 허용하고 `ml-10`으로 들여쓴다. 2단계 이상은 `@닉네임` 멘션으로 처리한다.
- 댓글 간격은 24px, 대댓글 간격은 16px다.

### 8.12 PostEditor — `components/post/PostEditor.tsx`

- 필드 순서: 게시판 select(sm:w-64) → 제목 → 본문(작성/미리보기 세그먼트, 마크다운) → 태그 입력 → 액션 바.
- 액션 바는 상단 보더와 `pt-5`, 우측 정렬로 [취소 ghost] [임시저장 secondary] [게시하기 brand] 순서다.
- 제목은 필수이고 최대 100자, 본문은 필수, 태그는 최대 5개다. 검증 메시지는 필드 하단에 표시한다.
- 이탈할 때 작성 중인 내용이 있으면 확인 모달을 띄운다.

### 8.13 Right Rail 위젯 — `components/community/`

`BoardInfo`, `PopularPosts`, `TagCloud`, `BoardRules`로 구성한다. 공통 구조는 섹션 라벨(12/500 fg-muted) → 간격 8px → 콘텐츠다. 카드 배경이나 보더로 감싸지 않는다(스탯 타일만 `rounded-md border`).

### 8.14 빈 상태 · 에러 · 로딩

| 상황 | 표현 |
|---|---|
| 빈 목록 | 컨테이너 안 중앙, 아이콘 24 fg-subtle + “아직 글이 없어요” (14/500) + “첫 글을 남겨보세요” (13 fg-muted) + `primary sm` 새 글 작성 |
| 검색 결과 없음 | “‘{검색어}’에 대한 결과가 없어요” + 검색어 수정 안내 |
| 에러 | “불러오지 못했어요” + `secondary sm` 다시 시도. 에러를 숨기지 않는다. |
| 로딩 | 스켈레톤: `animate-pulse bg-zinc-100 rounded` 로 제목(60%)·메타(30%) 두 줄 |

---

## 9. UX 라이팅

- 문체는 **해요체**이고 짧게 쓴다. 안내와 에러는 “~했어요 / ~해주세요”로 끝낸다.
- 버튼 라벨은 2~5자 동사형(등록, 취소, 게시하기, 임시저장, 다시 시도)으로 쓴다. “확인”은 모달에서만 쓴다.
- 시간은 1분 미만이면 “방금”, 1시간 미만이면 “N분 전”, 24시간 미만이면 “N시간 전”, 어제면 “어제”, 올해면 `MM.DD`, 그 외에는 `YYYY.MM.DD`로 표기한다.
- 숫자는 1,000 이상부터 천 단위 콤마를 쓴다. 10,000 이상은 리스트에서만 `1.2만`으로 줄인다.

---

## 10. 접근성 체크리스트

- [ ] 텍스트 대비 4.5:1 이상 (`fg-subtle`, `brand-strong`은 텍스트에 쓰지 않는다)
- [ ] 모든 인터랙티브 요소에 `focus-visible` 표시
- [ ] 아이콘 전용 버튼에 `aria-label`
- [ ] 카테고리·상태를 색만으로 전달하지 않음 (텍스트 동반)
- [ ] 클릭 영역 최소 32×32px (모바일 44×44px)
- [ ] 탭은 `role="tablist"`, 현재 메뉴는 `aria-current="page"`
- [ ] 이미지 `alt`, 폼 필드 `<label>` 연결

---

## 11. 구현 매핑

### 11.1 `globals.css` 토큰 (적용 시 기존 `:root` 블록 대체)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Pretendard Variable", Pretendard, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono);

  --color-surface: #ffffff;
  --color-surface-subtle: #fafafa;
  --color-surface-muted: #f4f4f5;
  --color-border: #e4e4e7;
  --color-border-subtle: #f4f4f5;
  --color-border-strong: #9f9fa9;

  --color-fg: #18181b;
  --color-fg-body: #3f3f46;
  --color-fg-secondary: #52525c;
  --color-fg-muted: #71717b;
  --color-fg-subtle: #9f9fa9;

  --color-primary: #18181b;
  --color-primary-hover: #3f3f46;
  --color-brand: #008236;
  --color-brand-hover: #016630;
  --color-brand-soft: #f0fdf4;
  --color-brand-strong: #00c950;

  --color-cat-all: #9f9fa9;
  --color-cat-free: #00c950;
  --color-cat-qna: #00a6f4;
  --color-cat-info: #fe9a00;
  --color-cat-review: #8e51ff;
}

body {
  background: var(--color-surface);
  color: var(--color-fg);
  font-size: 14px;
}
```

사용 예: `text-fg-muted`, `bg-surface-subtle`, `border-border`, `bg-brand hover:bg-brand-hover`, `bg-cat-qna`

> 다크 모드는 v1 범위에서 제외한다. 토큰을 시맨틱 이름으로 쓰면 이후 `.dark` 값만 추가해 대응할 수 있다.

### 11.2 폰트

`layout.tsx`의 Geist Sans를 Pretendard로 바꾼다. `next/font/local`로 `PretendardVariable.woff2`를 `src/app/fonts/`에 두는 방식을 권장한다(CDN 의존과 레이아웃 시프트를 없애기 위해서다).

### 11.3 컴포넌트 · 라우트 배치

```
src/
├─ app/community/
│  ├─ layout.tsx            # AppShell (Sidebar + Topbar + RightRail)
│  ├─ [board]/page.tsx      # 목록
│  ├─ [board]/[postId]/page.tsx  # 상세
│  └─ write/page.tsx        # 글쓰기
├─ components/
│  ├─ common/   Button, Input, Textarea, Select, SegmentedTabs, Badge, Avatar, Pagination, EmptyState, Skeleton
│  ├─ layout/   AppShell, Sidebar, Topbar, MobileNavDrawer, RightRail
│  ├─ community/ BoardNav, BoardInfo, PopularPosts, TagCloud, BoardRules
│  └─ post/     PostList, PostListItem, NoticeRow, PostDetail, PostActions, CommentList, CommentItem, CommentForm, PostEditor
├─ lib/utils/   formatRelativeTime, formatCount, cn
└─ types/       board.ts, post.ts, comment.ts
```

---

## 변경 이력

| 버전 | 날짜 | 내용 |
|---|---|---|
| v1.0 | 2026-09-30 | C1 시안 기반 최초 작성, 접근성 대비 보정(zinc-500 / green-700) |

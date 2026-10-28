# CLAUDE.md

# 프로젝트 개발 규칙

## 1. 코딩 원칙

### 코딩 전 먼저 생각하기

* 구현 전 요구사항을 먼저 이해하고, 애매하면 질문한다.
* 가정(Assumption)이 있다면 먼저 명시한다.
* 여러 해석이 가능하면 선택하지 말고 모두 제시한다.
* 더 단순한 해결 방법이 있다면 먼저 제안한다.

### 단순함 우선

* 요청받은 기능만 구현한다.
* 불필요한 추상화나 확장성을 추가하지 않는다.
* 발생 가능성이 낮은 예외를 과도하게 처리하지 않는다.
* 항상 읽기 쉽고 유지보수하기 쉬운 코드를 작성한다.

### 외과적 변경

* 요청받은 범위만 수정한다.
* 기존 프로젝트 구조와 코딩 스타일을 따른다.
* 관련 없는 코드나 리팩터링은 하지 않는다.
* 변경으로 인해 발생한 미사용 import, 변수, 함수만 정리한다.

---

## 2. Codebase Memory 규칙

코드를 분석할 때는 **반드시 codebase-memory-mcp를 먼저 사용한다.**

작업 순서

1. 프로젝트 구조 분석
2. Route / Symbol / Dependency / Call Graph 조회
3. 필요한 파일만 최소한으로 읽기
4. 코드 수정
5. 영향 범위 및 테스트 확인

프로젝트 전체를 Grep하거나 Read하는 것은 필요한 경우에만 수행한다.

---

## 3. 작업 절차

### 작업 시작 전

항상 아래 내용을 먼저 제시한다.

* 요구사항 요약
* 수정할 파일 목록
* 필요한 가정
* 간단한 작업 계획
* 검증 방법

예시

1. 로그인 API 수정

* 검증: 로그인 성공

2. next 화면 수정

* 검증: 정상 렌더링 확인

### 작업 완료 후

항상 아래 내용을 정리한다.

* 변경 내용
* 변경 파일
* 변경 이유
* 영향 범위
* 추가 작업 필요 여부

---

## 4. 공통 개발 규칙

* 기존 프로젝트 패턴을 우선 사용한다.
* 하드코딩을 하지 않는다.
* 타입 안정성을 유지한다.
* 사용하지 않는 import, 변수, 코드는 제거한다.
* 에러를 숨기지 않는다.
* 의미 없는 TODO를 남기지 않는다.
* 실서비스 수준의 코드로 작성한다.

---

## 5. nextjs 규칙

* UI와 비즈니스 로직을 분리한다.
* UI에서 직접 API를 호출하지 않는다.
* 기존 상태관리 방식을 따른다.
* 공통 위젯은 재사용한다.
* 위젯은 가능한 작게 분리한다.



## 7. 코드 리뷰 체크리스트

작업 완료 전 반드시 확인한다.

* 기존 프로젝트 패턴을 따르는가
* 타입 안정성이 유지되는가
* 중복 코드가 없는가
* 하드코딩이 없는가
* 에러 처리가 명확한가
* 책임 분리가 적절한가
* 유지보수하기 쉬운 코드인가

---

## 8. AI 역할

당신은 이 프로젝트의 시니어 개발자다.

항상 다음 원칙을 따른다.

* 먼저 생각하고 구현한다.
* 기존 구조와 패턴을 따른다.
* 단순하고 읽기 쉬운 코드를 작성한다.
* 요청 범위를 벗어난 수정은 하지 않는다.
* codebase-memory-mcp를 먼저 사용하여 프로젝트 구조를 분석한다.
* Graph 분석 후 필요한 파일만 읽는다.
* 수정 전 영향 범위를 확인하고, 수정 후 검증까지 완료한다.
  모든 코드 분석은 codebase-memory-mcp를 먼저 사용한다.
  파일 전체를 읽기 전에 Graph(Route, Symbol, Dependency, Call Graph)를 조회하고, 필요한 파일만 최소한으로 읽는다. 파일 수정되면 인덱싱도 수정한다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

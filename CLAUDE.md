# CLAUDE.md — Tech Blog 프로젝트 가이드

## 프로젝트 개요 및 목표

개인 기술 블로그. Notion 수준의 깔끔한 UI를 목표로 한다.

- 콘텐츠 출처: Velog 포스트, Notion export, Brandi Labs 아카이브 (Wayback Machine)
- 정적 생성(SSG) 방식으로 빌드, 별도 CMS 없이 MDX 파일로 콘텐츠 관리
- 한국어 기술 블로그, 경어체(~합니다/~입니다) 톤 유지

---

## 기술 스택

| 항목 | 버전/값 |
|---|---|
| Next.js | 15.5.12 (App Router, SSG) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | v4 (CSS-first `@theme` 방식, `postcss.config.mjs`) |
| MDX | next-mdx-remote v6 (`next-mdx-remote/rsc`) |
| Markdown 플러그인 | remark-gfm (테이블 필수!), rehype-pretty-code + Shiki |
| 코드 하이라이팅 테마 | github-light / github-dark (dual theme) |
| 검색 | fuse.js (클라이언트 사이드) |
| 날짜 | date-fns + ko locale |
| 다크모드 | next-themes |
| Node.js | v24.13.0 via nvm |

---

## 개발 환경 세팅 및 주요 명령어

```bash
# nvm 세팅 (매 세션마다 필요)
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 24.13.0

# 개발 서버
npm run dev

# 프로덕션 빌드 (변경 후 반드시 검증)
npx next build
```

---

## 디렉토리 구조

```
tech-blog/
├── content/posts/          # MDX 콘텐츠 파일
├── public/images/          # 포스트 이미지 (슬러그별 폴더)
│   └── <slug>/             # ex) http-basics/, internet-network/
├── src/
│   ├── app/
│   │   ├── page.tsx                      # 홈 (포스트 목록 + 검색)
│   │   ├── posts/[slug]/page.tsx         # 포스트 상세
│   │   ├── posts/[slug]/opengraph-image.tsx
│   │   ├── tags/page.tsx                 # 태그 목록
│   │   ├── tags/[tag]/page.tsx           # 태그별 포스트
│   │   ├── layout.tsx                    # 루트 레이아웃
│   │   ├── globals.css                   # Tailwind v4 + Notion 스타일
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── mdx/
│   │   │   ├── MdxRenderer.tsx           # MDX 렌더러 (플러그인 설정)
│   │   │   ├── MdxComponents.tsx         # MDX 커스텀 컴포넌트 등록
│   │   │   ├── Callout.tsx               # 콜아웃 박스
│   │   │   ├── CodeBlock.tsx             # 코드블록 (복사 버튼)
│   │   │   └── Video.tsx                 # 비디오 (YouTube / 로컬 mp4)
│   │   ├── posts/                        # PostCard, PostHeader, PostList, SearchBar
│   │   ├── layout/                       # Header, Footer, Container
│   │   └── ui/                           # ThemeProvider, ThemeToggle
│   ├── lib/
│   │   ├── posts.ts                      # getAllPosts, getPostBySlug 등 유틸
│   │   └── constants.ts                  # SITE_CONFIG
│   └── types/index.ts                    # Post, PostMeta 타입
```

---

## MDX 포스트 작성 규칙

### Frontmatter 필수 필드

```yaml
---
title: "포스트 제목"
description: "한 줄 요약 (~합니다 톤)"
date: YYYY-MM-DD
tags: ["태그1", "태그2"]
cover: null          # 커버 이미지 경로 또는 null
---
```

### 이미지 경로 규칙

- 로컬 이미지: `public/images/<slug>/파일명.png` → MDX에서 `/images/<slug>/파일명.png`
- Notion export 이미지: 한글/인코딩된 파일명 → 영문 설명명으로 변경 후 복사
- 외부 이미지: 허용된 도메인 (`velog.velcdn.com`, `images.velog.io`, `**.amazonaws.com`)

### 커스텀 컴포넌트

```mdx
<Callout emoji="💡">내용</Callout>

<Video src="/images/<slug>/video.mp4" caption="설명" />
<Video src="https://youtube.com/watch?v=..." caption="설명" />

<CodeBlock title="파일명.ts">코드</CodeBlock>
```

### 코드블록 언어 힌트

- HTTP 요청/응답 예시: 언어 힌트 없이 bare ` ``` ` 사용 (기존 포스트 컨벤션)
- 쉘 명령어: `bash`
- TypeScript/JavaScript: `typescript` / `javascript`

### 톤 컨벤션

- 경어체: `~합니다`, `~입니다`, `~됩니다`
- Notion export는 반말/메모체(`~함`, `~됨`, `~있음`)이므로 변환 필요

---

## Notion Export → MDX 변환 절차

1. `content/posts/`에 있는 `.md` 파일과 이미지 디렉토리 확인
2. 이미지를 `public/images/<slug>/`로 영문명으로 복사
3. MDX 파일 생성 (frontmatter + 경어체 변환 + Notion 아티팩트 제거)
   - H1 제거 (frontmatter title로 대체)
   - 코드블록 `jsx` → 적절한 언어 힌트로 변경
   - Notion 인코딩 이미지 경로 → 로컬 경로로 교체
   - `.mov` 파일 → `ffmpeg`으로 `.mp4` 변환 후 `<Video>` 컴포넌트 사용
4. Notion 원본 `.md` 파일 및 이미지 디렉토리 삭제
5. `npx next build`로 검증

---

## 현재 포스트 목록 (26개)

### 시리즈: 모든 개발자를 위한 HTTP 웹 기본 지식 (7개)

- `internet-network.mdx` — 인터넷 네트워크 (2022-06-14)
- `uri-web-browser-request.mdx` — URI와 웹 브라우저 요청 흐름 (2022-06-14)
- `http-basics.mdx` — HTTP 기본 (2022-06-19)
- `http-methods.mdx` — HTTP 메서드 (2022-06-19)
- `http-methods-usage.mdx` — HTTP 메서드 활용 (2022-06-19)
- `http-status-codes.mdx` — HTTP 상태코드 (2022-06-20)
- `http-headers-general.mdx` — HTTP 헤더1 - 일반 헤더 (2022-06-20)

### Frontend / CSS

- `flex-grid.mdx` — Flex와 Grid에 대한 정리 (2021-02-01)
- `tailwind-why.mdx` — Tailwind 왜 쓸까? (2024-09-15)
- `tailwind-basics.mdx` — Tailwind 기본 사용법 (2024-09-17)
- `tailwind-custom.mdx` — Tailwind 커스텀 하기 (2024-09-19)

### Vue.js

- `bootstrap-vue-component.mdx` — Bootstrap-vue 컴포넌트 (2022-02-10)
- `do-not-trust-accept-attribute.mdx` — accept를 신뢰하지 말 것 (2022-03-07)
- `swiper-vue-ie11.mdx` — IE11 환경에서의 Swiper 적용기 (2021-08-02) ⚠️ 이미지 18개 복구 불가 (플레이스홀더로 대체, 본문 [이미지 누락] 표시 기준 — 2026-07-06 확정)

### SEO / Lighthouse

- `google-lighthouse.mdx` — Google Lighthouse (2020-11-09)
- `google-lighthouse-seo.mdx` — Google Lighthouse SEO (2020-11-09)
- `lighthouse-seo-title-element.mdx` (2020-11-12)
- `lighthouse-seo-meta-description.mdx` (2020-11-13)
- `lighthouse-seo-link-text.mdx` (2020-11-14)
- `lighthouse-seo-hreflang.mdx` (2020-11-15)
- `lighthouse-seo-rel-canonical.mdx` (2020-11-17)
- `lighthouse-seo-image-alt.mdx` (2020-11-21)
- `labels-and-text-alternatives.mdx` — Accessibility (2020-12-03)
- `seo-meta-description-mismatch.mdx` (2021-08-03)

### Next.js / 블로그

- `hello-world.mdx` — 블로그를 시작합니다 (2024-01-15)
- `nextjs-app-router.mdx` — Next.js App Router 시작하기 (2024-02-01)

---

## TODO (남은 작업)

### 콘텐츠

- [ ] HTTP 시리즈 후속 포스트 추가 (HTTP 헤더2, 캐시 등 Notion에 있을 수 있음)
- [ ] `SITE_CONFIG` 실제 정보로 업데이트 (`src/lib/constants.ts` — 현재 "Tech Blog", "Blog Author" 플레이스홀더)
- [ ] `hello-world.mdx` 블로그 소개글 내용 보강

### 기능 개선

- [ ] OG 이미지 커스터마이징 (`src/app/posts/[slug]/opengraph-image.tsx`)
- [ ] 포스트 시리즈/연관글 표시 (현재 없음)
- [ ] 이미지 lightbox/확대 기능

### 인프라

- [ ] `.env.local`의 `NEXT_PUBLIC_SITE_URL` 실제 배포 URL로 설정
- [ ] Git 저장소 초기화 (`git init`) — 현재 버전 관리 없음
- [ ] 배포 (Vercel 권장)

---

## 중요 결정사항 및 이유

| 결정 | 이유 |
|---|---|
| `remark-gfm` 필수 설치 | 없으면 MDX에서 GFM 테이블(`\|col\|`)이 `<table>`로 렌더링되지 않음 |
| Tailwind v4 CSS-first 방식 | `tailwind.config.js` 없이 `globals.css`의 `@theme`로 디자인 토큰 정의 |
| `next-mdx-remote/rsc` | Next.js 15 App Router 서버 컴포넌트 호환, 빌드 타임 렌더링 |
| 이미지 경로 `public/images/<slug>/` | Next.js `Image` 컴포넌트의 `src`가 `/`로 시작해야 자동 최적화 적용 |
| `.mov` → `.mp4` 변환 | `.mov`는 Safari 전용, 크로스브라우저 지원을 위해 ffmpeg으로 변환 (`brew install ffmpeg`) |
| Swiper 포스트 이미지 플레이스홀더 | Wayback Machine CDX API 확인 결과 `/assets/2021/0802/` 경로 0건 — 완전 소실 확인 |
| Notion export 한글 파일명 → 영문 | URL 인코딩 문제 방지, `public/` 경로 가독성 향상 |
| HTTP 예시 코드블록 bare ` ``` ` | 기존 포스트 컨벤션 유지, rehype-pretty-code가 언어 없는 블록도 스타일링함 |

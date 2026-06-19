# 포트폴리오 제작 워크플로우

## 1. 전체 흐름

```
[기획] → [콘텐츠 정리] → [개발] → [How 콘텐츠 연동] → [배포]
  ↑         (병렬 가능)        ↑
  완료        진행 중          다음 단계
```

## 2. Phase 0 — 기획 (완료)

- [x] 사이트맵 확정 (`/`, `/portfolio/what`, `/portfolio/how/[slug]`)
- [x] What 아코디언 항목 설계
- [x] How 상세 페이지 구조 설계
- [x] PRD / ERD / WIREFRAME / WORKFLOW 문서 작성

## 3. Phase 1 — What 콘텐츠 정리

### 3-1. PDF/Figma에서 프로젝트 목록 추출

**기준**: PDF 3번 페이지 목차

**작업**
1. PDF/Figma를 열고 3번 페이지 목차 항목을 전부 나열
2. 각 항목에 `slug` 부여 (영문 kebab-case)
3. 순서(`order`) 번호 부여

**산출물**: 프로젝트 목록 테이블

| order | title | slug | period | role |
|-------|-------|------|--------|------|
| 1 | (프로젝트명) | (slug) | (기간) | (역할) |
| 2 | ... | ... | ... | ... |

### 3-2. 프로젝트별 What 콘텐츠 작성

각 프로젝트마다 아래 템플릿으로 작성한다.

```md
[접힌 상태]
번호:
프로젝트명:
기간:
역할:
한 줄 요약:
태그:

[펼친 상태]
프로젝트 개요:
담당 업무:
-
-
-

주요 산출물:
-
-
-

핵심 포인트:
-
-
-

How 링크용 slug:
```

**작성 가이드**
- 한 줄 요약: 1문장
- 프로젝트 개요: 2~3문장
- 담당 업무: 3~5개 bullet
- 주요 산출물: 3~5개 bullet
- 핵심 포인트: 2~4개

### 3-3. YAML 파일 변환

작성한 내용을 `content/projects/*.yaml` 형식으로 변환한다.

```
content/
  projects/
    project-01.yaml
    project-02.yaml
    ...
```

**완료 기준**
- PDF/Figma 목차의 모든 프로젝트가 YAML로 존재
- 각 파일에 접힌/펼친 상태 필드가 모두 채워짐

## 4. Phase 2 — 개발

### 4-1. 프로젝트 스캐폴딩

```bash
npx create-next-app@latest . --typescript --tailwind --app --src-dir
```

**폴더 구조**

```
src/
  app/
    page.tsx                          # Home
    portfolio/
      what/
        page.tsx                      # What 아코디언
      how/
        [slug]/
          page.tsx                    # How 상세
  components/
    layout/
      Header.tsx
      Footer.tsx
    what/
      Accordion.tsx
      AccordionItem.tsx
    how/
      ComingSoon.tsx
      BackLink.tsx
    common/
      Tag.tsx
      Section.tsx
  lib/
    projects.ts                       # YAML 로더
content/
  about.md
  projects/
    *.yaml
  how/
    *.md                              # 추후
public/
  images/                             # 필요 시
docs/
  PRD.md
  ERD.md
  WIREFRAME.md
  WORKFLOW.md
```

### 4-2. 개발 순서

| 순서 | 작업 | 완료 기준 |
|------|------|-----------|
| 1 | 공통 레이아웃 (Header, Footer) | 모든 페이지에 적용 |
| 2 | About 페이지 (`/`) | 자기소개 + 이력 표시 |
| 3 | What 아코디언 (`/portfolio/what`) | 목록 + 접힘/펼침 동작 |
| 4 | How 상세 틀 (`/portfolio/how/[slug]`) | 준비 중 상태 표시 |
| 5 | What → How 링크 연결 | slug 기반 라우팅 |
| 6 | 반응형 점검 | 모바일 아코디언 확인 |

### 4-3. What 페이지 구현 체크리스트

- [ ] YAML에서 프로젝트 목록 로드
- [ ] `order` 기준 정렬
- [ ] 아코디언 접힌 상태 UI
- [ ] 아코디언 펼침/접힘 토글
- [ ] 펼친 상태: 개요, 담당 업무, 산출물, 핵심 포인트
- [ ] `How 자세히 보기` 링크
- [ ] `howStatus: draft` 배지 (선택)

### 4-4. How 페이지 구현 체크리스트

- [ ] `[slug]` 동적 라우트
- [ ] 프로젝트명, 기간, 역할 표시
- [ ] `howStatus: draft` → "준비 중" 안내
- [ ] `howStatus: ready` → How 콘텐츠 렌더 (추후)
- [ ] "What으로 돌아가기" 링크

## 5. Phase 3 — How 콘텐츠 연동 (추후)

### 5-1. 노션 정리 템플릿

프로젝트마다 아래 틀에 맞춰 노션에 작성한다.

```markdown
# [프로젝트명]

## 문제 정의
이 프로젝트가 왜 필요했는지, 어떤 문제를 해결하려 했는지

## 맡은 역할
내가 구체적으로 어떤 역할을 맡았는지

## 진행 과정
1. (단계 1)
2. (단계 2)
3. (단계 3)

## 사용한 도구/방법
- 도구/방법 1
- 도구/방법 2

## 협업 방식
어떤 팀/역할과 어떻게 협업했는지

## 결과 및 회고
- 결과: 무엇이 달라졌는지
- 회고: 배운 점, 아쉬운 점
```

### 5-2. 노션 → 사이트 연동 절차

```
노션 작성
  → Markdown export 또는 복사
  → content/how/[slug].md 파일 생성
  → project YAML의 howStatus를 ready로 변경
  → 로컬 확인
  → 배포
```

### 5-3. How 연동 체크리스트

- [ ] 노션에서 프로젝트별 How 문서 작성
- [ ] `content/how/[slug].md` 파일 생성
- [ ] 해당 프로젝트 `howStatus: ready` 변경
- [ ] How 상세 페이지 콘텐츠 렌더 확인
- [ ] What 아코디언에서 How 링크 동작 확인

## 6. Phase 4 — 배포

### 6-1. 배포 전 점검

| 항목 | 확인 |
|------|------|
| What과 How의 slug 연결 | 모든 프로젝트 slug 일치 |
| 모바일 아코디언 | 터치 영역, 스크롤 확인 |
| What 목록 탐색 | 목차처럼 빠르게 훑기 가능 |
| How 준비 중 상태 | draft 프로젝트 어색하지 않음 |
| PDF/Figma 순서 | order 번호 일치 |
| SEO | title, description 설정 |
| 링크 | 외부 링크, 내부 라우팅 정상 |

### 6-2. 배포

```bash
# Vercel (권장)
vercel deploy

# 또는 GitHub 연동 후 자동 배포
git push origin main
```

## 7. 운영 규칙

### 새 프로젝트 추가 시

1. `slug` 먼저 생성
2. `content/projects/[slug].yaml` 작성 (What)
3. `content/how/[slug].md` 빈 파일 생성 (How)
4. `howStatus: draft` 설정
5. 로컬 확인 → 배포

### What 내용 수정 시

1. 해당 YAML 파일 수정
2. 로컬 확인 → 배포

### How 내용 추가 시

1. 노션에서 템플릿에 맞춰 작성
2. `content/how/[slug].md`에 반영
3. `howStatus: ready` 변경
4. 로컬 확인 → 배포

## 8. 일정 (권장)

| 주차 | 목표 |
|------|------|
| 1주차 | What 콘텐츠 YAML 작성, 스캐폴딩, About + What 페이지 |
| 2주차 | How 페이지 틀, 반응형, 배포 |
| 이후 | 노션 How 작성 → 프로젝트별 순차 연동 |

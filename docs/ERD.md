# 포트폴리오 콘텐츠 ERD

## 1. 개요

이 프로젝트는 데이터베이스가 필수는 아니며, 초기에는 **정적 콘텐츠 파일**로 관리한다.

### 저장 방식

- `content/about.md` — 자기소개 + 이력
- `content/projects/*.yaml` — 프로젝트별 What 콘텐츠
- `content/how/*.md` — 프로젝트별 How 상세 (추후)

### 연결 키

What과 How는 **`slug`** 를 기준으로 1:1 연결한다.

## 2. Entity 관계도

```
┌─────────────┐       1:1        ┌──────────────┐
│   Project   │─────────────────▶│ WhatContent  │
│             │                  │              │
│  slug (PK)  │       1:0..1     │  overview    │
│  title      │─────────────────▶│  responsibilities │
│  period     │                  │  deliverables│
│  role       │   ┌──────────────┤  highlights  │
│  summary    │   │              └──────────────┘
│  tags       │   │
│  order      │   │  1:0..1
│  howStatus  │   │
└─────────────┘   │              ┌──────────────┐
                  └─────────────▶│ HowContent   │
                                 │              │
                                 │  problem     │
                                 │  roleDetail  │
                                 │  process     │
                                 │  tools       │
                                 │  collaboration│
                                 │  result      │
                                 │  retrospective│
                                 └──────────────┘
```

## 3. Entity 상세

### 3.1 Project

프로젝트의 기본 정보. What 아코디언의 접힌/펼친 상태 모두에 사용된다.

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | O | 내부 식별자 (`project-01`) |
| `slug` | string | O | URL 및 What/How 연결 키 (unique) |
| `order` | number | O | 노출 순서 (목차 번호) |
| `title` | string | O | 프로젝트명 |
| `period` | string | O | 진행 기간 |
| `role` | string | O | 담당 역할 |
| `summary` | string | O | 한 줄 요약 (접힌 상태) |
| `tags` | string[] | O | 태그 목록 |
| `what` | WhatContent | O | 아코디언 펼친 상태 콘텐츠 |
| `howStatus` | enum | O | How 작성 상태 (`draft` \| `ready`) |

### 3.2 WhatContent

What 아코디언을 펼쳤을 때 보여줄 내용.

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `overview` | string | O | 프로젝트 개요 (2~3문장) |
| `responsibilities` | string[] | O | 담당 업무 목록 (3~5개) |
| `deliverables` | string[] | O | 주요 산출물 목록 (3~5개) |
| `highlights` | string[] | O | 핵심 포인트 (2~4개) |

### 3.3 HowContent

추후 노션 정리본을 기반으로 채워질 상세 콘텐츠.

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `slug` | string | O | Project와 연결되는 키 (FK) |
| `problem` | string | - | 문제 정의 |
| `roleDetail` | string | - | 상세 역할 설명 |
| `process` | string[] | - | 진행 과정 |
| `tools` | string[] | - | 사용 도구/방법 |
| `collaboration` | string | - | 협업 방식 |
| `result` | string | - | 결과 |
| `retrospective` | string | - | 회고 / 배운 점 |

### 3.4 About (별도 엔티티)

Home 페이지용 자기소개 콘텐츠.

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `name` | string | O | 이름 |
| `headline` | string | O | 한 줄 소개 |
| `bio` | string | O | 자기소개 본문 |
| `experiences` | Experience[] | O | 이력 목록 |
| `skills` | string[] | O | 기술/도구 태그 |
| `links` | Link[] | - | 외부 링크 (이메일, 노션 등) |

#### Experience

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `company` | string | O | 회사/조직명 |
| `period` | string | O | 기간 |
| `role` | string | O | 역할 |
| `description` | string | - | 업무 설명 |

## 4. 관계 규칙

| 관계 | 카디널리티 | 설명 |
|------|-----------|------|
| Project → WhatContent | 1:1 | 모든 프로젝트는 What 콘텐츠를 반드시 가짐 |
| Project → HowContent | 1:0..1 | How 콘텐츠는 초기에 없을 수 있음 |
| HowContent 없을 때 | - | 상세 페이지에 "준비 중" 표시 |

## 5. howStatus 상태값

| 값 | 의미 | UI 동작 |
|----|------|---------|
| `draft` | How 내용 미작성 | 상세 페이지에 "준비 중" 표시, What에서도 배지 가능 |
| `ready` | How 내용 작성 완료 | 상세 페이지에 전체 콘텐츠 표시 |

## 6. 파일 구조

```
content/
  about.md
  projects/
    project-01.yaml
    project-02.yaml
    ...
  how/
    payment-redesign.md    # slug와 동일한 파일명
    ...
```

## 7. 예시 데이터

### project-01.yaml

```yaml
id: project-01
slug: payment-redesign
order: 1
title: 결제 프로세스 개선
period: 2024.01 - 2024.03
role: UX/UI Designer
summary: 결제 이탈을 줄이기 위해 주문부터 완료까지의 흐름을 개선한 프로젝트
tags:
  - UX
  - Figma
  - 기획
howStatus: draft

what:
  overview: >
    기존 결제 단계에서 이탈률이 높아 주요 흐름을 재정리한 프로젝트입니다.
    주문, 결제수단 선택, 완료 화면까지의 UX를 점검하고 개선 방향을 설계했습니다.
  responsibilities:
    - 사용자 플로우 점검
    - 결제 화면 구조 재정의
    - 와이어프레임 및 UI 설계
    - 프로토타입 제작
    - 운영/개발 협의용 문서 정리
  deliverables:
    - 사용자 플로우 차트
    - 와이어프레임
    - 고도화 화면 설계안
    - 프로토타입
  highlights:
    - 결제 단계 단순화
    - CTA 위치 재정비
    - 이탈 구간 최소화
```

### how/payment-redesign.md (추후)

```markdown
---
slug: payment-redesign
---

# 결제 프로세스 개선 — How

## 문제 정의
(노션 정리 후 작성)

## 맡은 역할
(노션 정리 후 작성)

## 진행 과정
(노션 정리 후 작성)

## 사용한 도구/방법
(노션 정리 후 작성)

## 협업 방식
(노션 정리 후 작성)

## 결과 및 회고
(노션 정리 후 작성)
```

## 8. TypeScript 타입 (참고)

```typescript
type HowStatus = 'draft' | 'ready';

interface WhatContent {
  overview: string;
  responsibilities: string[];
  deliverables: string[];
  highlights: string[];
}

interface Project {
  id: string;
  slug: string;
  order: number;
  title: string;
  period: string;
  role: string;
  summary: string;
  tags: string[];
  what: WhatContent;
  howStatus: HowStatus;
}

interface HowContent {
  slug: string;
  problem?: string;
  roleDetail?: string;
  process?: string[];
  tools?: string[];
  collaboration?: string;
  result?: string;
  retrospective?: string;
}

interface Experience {
  company: string;
  period: string;
  role: string;
  description?: string;
}

interface About {
  name: string;
  headline: string;
  bio: string;
  experiences: Experience[];
  skills: string[];
  links?: { label: string; url: string }[];
}
```

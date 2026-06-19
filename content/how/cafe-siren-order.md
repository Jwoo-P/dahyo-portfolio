---
slug: cafe-siren-order
status: ready
---

## 프로젝트 개요

개인 카페를 대상으로 원격 주문이 가능한 앱 프로덕트 **Order Bell(오더벨)**을 기획·디자인한 개인 프로젝트입니다. 프랜차이즈의 사이렌 오더에서 영감을 받아, 개인 카페 사장님과 손님 모두에게 이익이 되는 비대면 주문 경험을 설계했습니다.

![Order Bell 프로젝트 표지](/images/how/cafe-siren-order/01-cover.jpg)

## 문제 정의

코로나19 이후 비대면 주문이 빠르게 확산되었고, 스타벅스 사이렌 오더처럼 스마트 주문 시스템은 대형 프랜차이즈에 집중되어 있었습니다. 개인 카페는 인건비 부담과 혼잡 시간대 운영 효율 문제를 겪고 있었고, 손님은 대기 시간·결제 불편·메뉴 선택 시간 부족 등을 불편으로 느끼고 있었습니다.

![비대면 서비스 도입 트렌드 리서치](/images/how/cafe-siren-order/02-research.jpg)

프랜차이즈 사이렌 오더 사용자 49명을 대상으로 설문을 진행했습니다. 응답자의 81.8%는 '미리 주문하고 빠르게 수령'을, 45.5%는 '결제 편의'를 주요 사용 이유로 꼽았습니다. 인터뷰에서도 혼잡 시간대 빠른 수령, 매장 대기 시간 감소, 메뉴를 천천히 살펴볼 수 있는 점이 반복적으로 언급되었습니다.

![사이렌 오더 사용 이유 설문·인터뷰](/images/how/cafe-siren-order/03-siren-order-research.jpg)

이를 바탕으로 빠른 주문 수령, 혼잡 시간대 매장 혼잡도 개선, 결제 절차 간소화, 카운터 주문 접수 실수 방지를 핵심 가치로 정의했습니다.

![프로젝트 핵심 가치](/images/how/cafe-siren-order/04-value-proposition.jpg)

## 맡은 역할

- 앱 프로덕트 기획 100%
- UI/UX 디자인 100%
- UX 리서치(설문·인터뷰) 기획 및 분석
- 사장님·손님 User flow 설계
- TO-BE 프로토타입 제작

## 진행 과정

### User flow 설계

사장님 관점에서는 주문 전 메뉴·매장 설정을 완료하고, 주문 발생 시 접수·영수증 출력·제조·완료 알림까지 한 흐름으로 처리하도록 설계했습니다.

![사장님 User flow](/images/how/cafe-siren-order/05-owner-flow.jpg)

손님 관점에서는 기존 매장 방문 후 대기하는 AS-IS 흐름과, 픽업 예상 시간을 확인한 뒤 주문하는 TO-BE 흐름을 비교했습니다. 오더벨에서는 주문 전 예상 시간을 확인해 불필요한 대기를 줄이도록 했습니다.

![손님 User flow — AS-IS / TO-BE 비교](/images/how/cafe-siren-order/06-customer-flow.jpg)

### 핵심 기능 정의

4가지 핵심 기능을 정의했습니다: 사이렌 오더(비대면 주문·결제), 내 주변 카페(GPS 기반 탐색), 즐겨찾는 주문(자주 주문하는 메뉴 저장), 결제 수단 등록(주문 절차 간소화).

![핵심 기능 4가지](/images/how/cafe-siren-order/07-key-functions.jpg)

### Key function 1. 사이렌 오더

주문 전 위치, 메뉴, 인테리어, 픽업 예상 시간을 빠르게 확인할 수 있도록 카페 카드와 상세 화면을 설계했습니다.

![주문 전 카페 정보 확인](/images/how/cafe-siren-order/08-cafe-info.jpg)

메뉴는 사장님이 등록한 이미지와 가격으로 직관적으로 확인하고, 필수·선택 옵션을 구분해 퍼스널 옵션 주문이 쉽도록 했습니다.

![메뉴 확인 및 옵션 선택](/images/how/cafe-siren-order/09-menu-selection.jpg)

메뉴를 담으면 바로 주문 가능한 상태가 되도록 하단 CTA를 설계해, 추가 메뉴 담기와 즉시 주문을 모두 지원했습니다.

![담기 → 주문하기 흐름](/images/how/cafe-siren-order/10-order-simple.jpg)

결제 화면에서 옵션·수량을 재확인한 뒤 등록된 결제 수단으로 빠르게 결제하고, 주문 확인 화면에서 제조 단계와 픽업 예상 시간을 추적할 수 있게 했습니다.

![결제 및 픽업 예상 시간 확인](/images/how/cafe-siren-order/11-payment-pickup.jpg)

사장님용 관리 화면에서는 가게 이미지, 주소, 운영시간, 휴무일을 그룹별로 입력할 수 있도록 구성했습니다.

![가게 정보 설정](/images/how/cafe-siren-order/12-store-setup.jpg)

메뉴 관리는 카테고리 → 메뉴 → 상세 설정의 depth 구조로 설계해 추가·수정·삭제가 직관적으로 이루어지도록 했습니다.

![메뉴 설정](/images/how/cafe-siren-order/13-menu-setup.jpg)

주문 접수는 영수증 형태로 표시해 제조에 필요한 정보를 놓치지 않도록 했고, 제조 완료 처리 시 손님 앱에 준비 완료 알림이 전달됩니다.

![주문 접수 및 제조 완료 처리](/images/how/cafe-siren-order/14-order-reception.jpg)

### Key function 2. 내 주변 카페

지도에서 패닝·줌으로 주변 카페를 탐색하고, 선택한 카페의 상세 정보를 확인할 수 있습니다.

![지도로 카페 탐색](/images/how/cafe-siren-order/15-map-search.jpg)

리스트는 가까운 순·가격 순·인기 순으로 정렬할 수 있으며, 정렬 선택 시 다른 화면으로 이동하지 않도록 설계했습니다.

![리스트 정렬 및 카페 선택](/images/how/cafe-siren-order/16-list-filter.jpg)

주소, 카페 이름, 해시태그로 검색할 수 있어 가까운 곳만 찾을 필요가 없습니다.

![검색 기능](/images/how/cafe-siren-order/17-search.jpg)

찾은 카페 위치는 리스트에서 지도 아이콘을 눌러 언제든 확인할 수 있고, 드래그 제스처로 지도를 닫고 다른 카페를 탐색할 수 있습니다.

![지도로 위치 재확인](/images/how/cafe-siren-order/18-map-confirm.jpg)

### Key function 3. 즐겨찾는 주문

자주 주문하는 메뉴는 플로팅 버튼으로 빠르게 접근하고, 저장된 옵션 그대로 바로 결제할 수 있습니다.

![즐겨찾는 주문으로 빠른 재주문](/images/how/cafe-siren-order/19-favorite-order.jpg)

같은 메뉴라도 주문마다 옵션이 다를 수 있으므로, 주문 내역에서 해당 설정 그대로 즐겨찾기에 등록할 수 있게 했습니다.

![주문 내역에서 즐겨찾기 등록](/images/how/cafe-siren-order/20-favorite-setup.jpg)

### Key function 4. 결제 수단 등록

마이페이지에서 자주 쓰는 카드를 미리 등록해 주문 시 결제 절차를 간소화했습니다.

![결제 수단 등록](/images/how/cafe-siren-order/21-payment-method.jpg)

## 사용한 도구/방법

- 데스크 리서치: 비대면 주문 트렌드·사이렌 오더 관련 기사 분석
- UX 리서치: 사이렌 오더 사용자 설문(49명) 및 인터뷰
- User flow / flowchart 설계 (사장님·손님 관점)
- Figma UI 시안 및 프로토타입 제작

## 협업 방식

개인 프로젝트로 진행했습니다. 리서치부터 프로덕트 기획, User flow 설계, UI 시안까지 단독으로 수행했습니다.

## 결과 및 회고

개인 카페를 위한 원격 주문 프로덕트 **Order Bell**의 TO-BE 프로토타입을 완성했습니다. 사장님·손님 양쪽의 User flow를 모두 설계하며, PMF 관점에서 0 to 1 프로덕트 기획 경험을 쌓을 수 있었습니다.

![프로젝트 마무리](/images/how/cafe-siren-order/22-end.jpg)

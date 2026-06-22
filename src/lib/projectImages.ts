/** 프로젝트 slug별 What 페이지 갤러리 이미지 경로 */
export const PROJECT_IMAGES: Record<string, string[]> = {
  "tikun-2-ops": [
    "/images/what/tikun-2-ops/1.jpg",
    "/images/what/tikun-2-ops/2.jpg",
    "/images/what/tikun-2-ops/3.jpg",
  ],
  "tikun-2-cart": [
    "/images/what/tikun-2-cart/1.jpg",
    "/images/what/tikun-2-cart/2.jpg",
    "/images/what/tikun-2-cart/3.jpg",
    "/images/what/tikun-2-cart/4.jpg",
  ],
  "adprint-guest-order": [
    "/images/what/adprint-guest-order/1.jpg",
    "/images/what/adprint-guest-order/2.jpg",
    "/images/what/adprint-guest-order/3.jpg",
    "/images/what/adprint-guest-order/4.jpg",
  ],
  "seller-recruitment": [
    "/images/what/seller-recruitment/1.jpg",
    "/images/what/seller-recruitment/2.jpg",
    "/images/what/seller-recruitment/3.jpg",
  ],
  "maritime-safety": [
    "/images/what/maritime-safety/1.jpg",
    "/images/what/maritime-safety/2.jpg",
    "/images/what/maritime-safety/3.jpg",
  ],
  "ai-hub-en": [
    "/images/what/ai-hub-en/1.jpg",
    "/images/what/ai-hub-en/2.jpg",
    "/images/what/ai-hub-en/3.jpg",
  ],
  "immersive-data-platform": [
    "/images/what/immersive-data-platform/1.jpg",
    "/images/what/immersive-data-platform/2.jpg",
    "/images/what/immersive-data-platform/3.jpg",
    "/images/what/immersive-data-platform/4.jpg",
  ],
  "seoul-50plus": [
    "/images/what/seoul-50plus/1.jpg",
    "/images/what/seoul-50plus/2.jpg",
    "/images/what/seoul-50plus/3.jpg",
    "/images/what/seoul-50plus/4.jpg",
  ],
  "starbucks-redesign": [
    "/images/what/starbucks-redesign/1.jpg",
    "/images/what/starbucks-redesign/2.jpg",
    "/images/what/starbucks-redesign/3.jpg",
    "/images/what/starbucks-redesign/4.jpg",
  ],
  "whale-onboarding": [
    "/images/what/whale-onboarding/1.jpg",
    "/images/what/whale-onboarding/2.jpg",
    "/images/what/whale-onboarding/3.jpg",
    "/images/what/whale-onboarding/4.jpg",
  ],
  "cafe-siren-order": [
    "/images/what/cafe-siren-order/1.jpg",
    "/images/what/cafe-siren-order/2.jpg",
    "/images/what/cafe-siren-order/3.jpg",
  ],
  "ddareungi-redesign": [
    "/images/what/ddareungi-redesign/1.jpg",
  ],
};

export function getProjectImages(slug: string): string[] {
  return PROJECT_IMAGES[slug] ?? [];
}

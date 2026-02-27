export const SITE_CONFIG = {
  title: "SoulLog",
  description: "한솔의 개인 기술 블로그",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "ko_KR",
  author: {
    name: "한솔",
  },
} as const;

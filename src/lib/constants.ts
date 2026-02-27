export const SITE_CONFIG = {
  title: "SoulLog",
  description: "Soul.Choi의 개인 기술 블로그",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "ko_KR",
  author: {
    name: "Soul.Choi",
  },
} as const;

const CONFIG = {
  // profile setting (required)
  profile: {
    name: "JONGHO LEE",
    image: "/avatar.svg", // 나중에 public 폴더의 이미지를 바꾸거나 주소를 넣으세요.
    role: "Software Developer",
    bio: "기술 블로그를 운영합니다.",
    email: "cjddydchgod1@gmail.com", // 필요시 수정
    linkedin: "", // 링크드인 ID가 있다면 입력
    github: "cjddydchgod1",
    instagram: "",
  },
  projects: [
    {
      name: `x-log`,
      href: "https://github.com/cjddydchgod1/x-log",
    },
  ],
  // blog setting (required)
  blog: {
    title: "X-LOG",
    description: "Gemini & Notion Automation Tech Blog",
    scheme: "dark", // 이종호 님은 다크 모드를 선호하실 것 같아 유지했습니다.
  },

  // CONFIG configration (required)
  // [중요] 500 에러 해결을 위해 이종호 님의 실제 도메인으로 수정했습니다.
  link: "https://x-log-ten.vercel.app",
  since: 2026,
  lang: "ko-KR", // 한국어로 변경
  ogImageGenerateURL: "https://og-image-korean.vercel.app",

  // notion configuration (required)
  // [중요] 런타임 에러 방지를 위해 ID를 직접 기입했습니다.
  notionConfig: {
    pageId: "f99e81110d578312ae61813152292402",
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: "cjddydchgod1/x-log", // 댓글 기능을 위해 리포지토리 연결
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "",
    },
  },
  isProd: process.env.VERCEL_ENV === "production",

  // [중요] 실시간 반영을 위해 42시간에서 1분(60초)으로 단축했습니다.
  revalidateTime: 60,
}

module.exports = { CONFIG }

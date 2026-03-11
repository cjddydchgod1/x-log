import { NotionAPI } from "notion-client"

export const getRecordMap = async (pageId: string) => {
  // NotionAPI 초기화 시 auth(API KEY)가 누락되면 undefined 에러가 날 수 있음
  const api = new NotionAPI({
    authToken: process.env.NOTION_API_KEY,
  })

  try {
    // pageId가 정상적인지 체크
    if (!pageId || pageId === "undefined") {
      throw new Error("Invalid pageId provided to getRecordMap")
    }

    return await api.getPage(pageId)
  } catch (error: any) {
    console.error("getRecordMap error:", error.message)
    throw error
  }
}

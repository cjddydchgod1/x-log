import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export const getPosts = async () => {
  // 1. CONFIG에서 ID를 가져오고, 없으면 직접 ID를 사용 (안전장치)
  let id =
    (CONFIG.notionConfig.pageId as string) || "f99e81110d578312ae61813152292402"
  const api = new NotionAPI()

  try {
    const response = await api.getPage(id)
    id = idToUuid(id)
    const collectionValue = Object.values(response.collection)[0]?.value as any
    const collection = collectionValue?.value ?? collectionValue
    const block = response.block
    const schema = collection?.schema

    const rawMetadata = (block[id].value as any)?.value ?? block[id].value

    // Check Type
    if (
      rawMetadata?.type !== "collection_view_page" &&
      rawMetadata?.type !== "collection_view"
    ) {
      return []
    } else {
      // Construct Data
      const pageIds = getAllPageIds(response)
      const data = []
      for (let i = 0; i < pageIds.length; i++) {
        const id = pageIds[i]
        const properties = (await getPageProperties(id, block, schema)) || null
        // Add fullwidth, createdtime to properties
        const pageBlockValue =
          (block[id].value as any)?.value ?? block[id].value
        properties.createdTime = new Date(
          pageBlockValue?.created_time
        ).toString()
        properties.fullWidth =
          (pageBlockValue?.format as any)?.page_full_width ?? false

        data.push(properties)
      }

      // Sort by date
      data.sort((a: any, b: any) => {
        const dateA: any = new Date(a?.date?.start_date || a.createdTime)
        const dateB: any = new Date(b?.date?.start_date || b.createdTime)
        return dateB - dateA
      })

      return data as TPosts
    }
  } catch (error) {
    // 2. 에러 발생 시 로그를 남기고 빈 배열 반환
    console.error("Notion API getPosts error:", error)
    return []
  }
}

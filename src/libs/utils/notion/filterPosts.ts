import { TPosts, TPostStatus, TPostType } from "src/types"

export type FilterPostsOptions = {
  acceptStatus?: TPostStatus[]
  acceptType?: TPostType[]
}

const initialOption: FilterPostsOptions = {
  acceptStatus: ["Public"],
  acceptType: ["Post"],
}

const current = new Date()
const tomorrow = new Date(current)
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export function filterPosts(
  posts: TPosts,
  options: FilterPostsOptions = initialOption
) {
  const { acceptStatus = ["Public"], acceptType = ["Post"] } = options

  return (
    posts
      // 1. 기본 유효성 및 날짜 필터
      .filter((post) => {
        const postDate = new Date(post?.date?.start_date || post.createdTime)
        if (!post.title || !post.slug || postDate > tomorrow) return false
        return true
      })
      // 2. 상태 필터 (다중 선택 대응)
      .filter((post) => {
        // post.status 배열의 요소 중 하나라도 acceptStatus에 포함되는지 확인
        return post.status.some((status) => acceptStatus.includes(status))
      })
      // 3. 타입 필터 (다중 선택 대응)
      .filter((post) => {
        // post.type 배열의 요소 중 하나라도 acceptType에 포함되는지 확인
        return post.type.some((type) => acceptType.includes(type))
      })
  )
}

import { NextApiRequest, NextApiResponse } from "next"
import { getPosts } from "../../apis"

// for all path revalidate, https://<your-site.com>/api/revalidate?secret=<token>
// for specific path revalidate, https://<your-site.com>/api/revalidate?secret=<token>&path=<path>
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, path } = req.query

  // 보안 토큰 확인
  if (secret !== process.env.TOKEN_FOR_REVALIDATE) {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    if (path && typeof path === "string") {
      // 특정 경로 갱신 시 슬래시 처리
      const revalidatePath = path.startsWith("/") ? path : `/${path}`
      await res.revalidate(revalidatePath)
      return res.json({ revalidated: true, path: revalidatePath })
    } else {
      // 전체 경로 갱신
      const posts = await getPosts()
      // @ts-ignore
      const revalidateRequests = posts.map((row) =>
        res.revalidate(`/${row.slug}`)
      )
      await Promise.all(revalidateRequests)
      return res.json({ revalidated: true, count: posts.length })
    }
  } catch (err: any) {
    // 에러 발생 시 상세 메시지 반환
    return res.status(500).json({
      message: "Error revalidating",
      error: err.message,
    })
  }
}

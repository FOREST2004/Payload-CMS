import { getPayload } from 'payload'
import config from '@/payload.config'
import { PostContent } from './PostContent'

type Props = {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  const { id } = await params
  const payload = await getPayload({ config })

  // Lấy post từ database
  const post = await payload.findByID({
    collection: 'posts',
    id,
  })

  return <PostContent initialPost={post} />
}

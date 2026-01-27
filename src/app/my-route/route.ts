import configPromise from '@payload-config'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })
  console.log('☄️☄️Request::::::::::', request)
  const allUsers = await payload.find({
    collection: 'users',
    select: { email: true, createdAt: true },
    req: request,
    overrideAccess: false, // mặc định là true, nếu set false thì sẽ không check access
  })

  return Response.json({
    message: 'All users:',
    data: allUsers.docs,
  })
}

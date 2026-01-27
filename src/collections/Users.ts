import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  versions: {
    drafts: true,
  },
  auth: true,
  // fields: [],
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user'],
      defaultValue: 'user',
    },
  ],
  access: {
    admin: ({ req }) => (req.user as any)?.role === 'admin', // Chỉ admin vào panel, ai dc vài admin panel
  },

  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          await req.payload.jobs.queue({
            task: 'log-message',
            input: { message: `User mới: ${doc.email}` },
            waitUntil: new Date(Date.now() + 15 * 1000), // 1 phút sau
          })
        }
      },
    ],
  },
}

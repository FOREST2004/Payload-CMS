import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
  // fields: [
  //   {
  //     name: 'role',
  //     type: 'select',
  //     options: ['admin', 'user'],
  //     defaultValue: 'user',
  //   },
  // ],
  // access: {
  //   admin: ({ req }) => (req.user as any)?.role === 'admin', // Chỉ admin vào panel
  // },
}

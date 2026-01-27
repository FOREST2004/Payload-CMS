import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    // autoLogin: {
    //   email: 'admin@payload.com',
    //   password: '123',
    // },
    importMap: {
      baseDir: path.resolve(dirname),
    },

    components: {
      logout: {
        Button: {
          path: '/components/Logout',
          exportName: 'MyComponent',
          clientProps: {
            label: 'Logout',
          },
        },
      },
    },

    livePreview: {
      // url: ({ data, collectionConfig }) => {
      //   const baseURL = 'http://localhost:3000'
      //   switch (collectionConfig?.slug) {
      //     // case 'users':
      //     //   return `${baseURL}/users/${data.id}`
      //     case 'posts':
      //       return `${baseURL}/posts/${data.id}`
      //     default:
      //       return ''
      //   }
      // },

      url: 'http://localhost:3000', // url để load preview, nên config url đúng với trang đang edit, ví dụ http://localhost:3000/posts/123

      collections: ['media'],
    },
  },
  collections: [Users, Media, Posts],
  globals: [SiteSettings],

  // Query Presets - Hiện tại chưa hoạt động
  queryPresets: {
    access: {
      // Cấu hình quyền truy cập cho từng operation
      read: () => true, // Ai cũng xem được
      create: ({ req }) => req.user?.role === 'admin', // Chỉ admin tạo
      update: ({ req }) => req.user?.role === 'admin', // Chỉ admin sửa
      delete: ({ req }) => req.user?.role === 'admin', // Chỉ admin xóa
    },
    constraints: {
      //collection nào dc apply preset
      read: [],
      create: [],
      update: [],
      delete: [],
    },
  },

  upload: {
    // cấu hình upload cho toàn bộ app
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },

  folders: {
    debug: true, // optional
    collectionOverrides: [
      async ({ collection }) => {
        return collection
      },
    ], // optional
    fieldName: 'folder', // optional
    slug: 'payload-folders', // optional
  },

  localization: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
  }, // ở giao diện tự động có nút switch locale

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],

  // Jobs Queue - xử lý công việc nền
  jobs: {
    autoRun: [
      {
        cron: '* * * * * *',
        limit: 1,
      },
    ],
    tasks: [
      {
        slug: 'log-message',
        inputSchema: [{ name: 'message', type: 'text', required: true }],
        handler: async ({ input }) => {
          console.log(`📧 Job chạy: ${input.message}`)
          return { output: { success: true } }
        },
      },
    ],
  },
})

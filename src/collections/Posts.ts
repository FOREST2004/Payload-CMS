import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  trash: true,
  versions: {
    drafts: true,
  },
  labels: {
    singular: 'Bài viết',
    plural: 'Bài viết',
  },
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        // URL của trang frontend để preview
        return `${'http://localhost:3000'}/posts/${data.id}`
      },
      breakpoints: [
        {
          label: 'Mobile1',
          name: 'mobile1',
          width: 375,
          height: 667,
        },
      ],
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Tiêu đề',
      type: 'text',
      required: true,
      localized: true, // Mỗi locale có title riêng
    },
    {
      name: 'featuredImage',
      label: 'Ảnh đại diện',
      type: 'upload',
      relationTo: 'media', // Liên kết với Media collection
      required: true,
    },
    {
      name: 'content',
      label: 'Nội dung',
      type: 'richText', // Sử dụng rich text editor (Lexical)
      required: true,
      localized: true, // Bật localization cho field này
    },
  ],
}

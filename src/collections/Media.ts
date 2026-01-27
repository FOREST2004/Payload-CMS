import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  folders: true,
  upload: {
    staticDir: 'media',

    mimeTypes: ['image/*'],

    filesRequiredOnCreate: true, // Bắt buộc upload khi tạo

    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'webp', // Convert sang webp
          options: { quality: 80 },
        },
      },
      {
        name: 'card',
        width: 768,
        height: undefined, // Giữ tỷ lệ
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        withoutEnlargement: true, // Không phóng to nếu ảnh nhỏ hơn
      },
    ],

    // Admin UI
    adminThumbnail: 'thumbnail', // Dùng size nào làm thumbnail trong admin

    // Focal point (cho phép chọn điểm focus)
    focalPoint: true,

    // Crop
    crop: true,
  },
}

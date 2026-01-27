import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Cài đặt Website',
  access: {
    read: () => true, // Ai cũng đọc được
  },
  fields: [
    {
      name: 'siteName',
      label: 'Tên Website',
      type: 'text',
      // required: true,
    },
    {
      name: 'siteDescription',
      label: 'Mô tả',
      type: 'textarea',
    },
    {
      name: 'contactEmail',
      label: 'Email liên hệ',
      type: 'email',
    },
    {
      name: 'socialLinks',
      label: 'Mạng xã hội',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
  ],
}

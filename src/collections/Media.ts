import type { CollectionConfig } from 'payload'

const assetsCollectionSlug = 'assets'

export const Assets: CollectionConfig = {
  slug: assetsCollectionSlug,
  access: {
    read: () => true,
  },
  trash: true,
  folders: true,
  enableQueryPresets: true,
  fields: [
    {
      type: 'ui',
      name: 'rewriteHomeHref',
      admin: {
        disableBulkEdit: true,
        disableListColumn: true,
        components: {
          Field: {
            path: '@utilities/RewriteHomeHref/index.server.js#RewriteHomeHref',
            clientProps: {
              assetsCollectionSlug,
            },
          },
        },
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'uploadedBy',
      relationTo: 'users',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      defaultValue: ({ req }) => req.user?.id || null,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'license',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'public',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'If unchecked, this media will not be publicly accessible.',
      },
    },
  ],
  upload: true,
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
}

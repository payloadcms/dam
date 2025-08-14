// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Assets } from './collections/Media'
import { Tags } from './collections/Tags'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeNavLinks: [
        {
          path: '@cms/components/NavIcon/index.js#NavIcon',
        },
      ],
      graphics: {
        Logo: {
          path: '@assets/Logo/index.js#Logo',
          clientProps: {
            size: 'large',
          },
        },
        Icon: '@assets/Logo/index.js#Logo',
      },
      actions: [
        {
          path: '@utilities/DashboardRedirect.js#DashboardRedirect',
          clientProps: {
            assetsCollectionSlug: Assets.slug,
          },
        },
      ],
    },
  },
  folders: {
    browseByFolder: false,
    collectionSpecific: false,
    collectionOverrides: [
      ({ collection }) => {
        collection.trash = true
        return collection
      },
    ],
  },
  collections: [Users, Assets, Tags],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  localization: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    fallback: true,
  },
})

import { Payload } from 'payload'
import { RewriteHomeHrefClient } from './index.client'

type Args = {
  payload: Payload
  assetsCollectionSlug: string
}
export const RewriteHomeHref = ({ payload, assetsCollectionSlug }: Args) => {
  if (!payload?.config?.folders) {
    return null
  }

  return (
    <RewriteHomeHrefClient
      assetsCollectionSlug={assetsCollectionSlug}
      foldersCollectionSlug={payload.config.folders.slug}
      adminRoute={payload.config.routes.admin}
    />
  )
}

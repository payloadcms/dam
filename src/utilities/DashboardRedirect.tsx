import { redirect } from 'next/navigation'
import { PayloadRequest } from 'payload'

type Args = {
  req: PayloadRequest
  assetsCollectionSlug: string
}
export const DashboardRedirect = ({ req, assetsCollectionSlug }: Args) => {
  const [routeWithoutParams] = req.url?.split('?') || []

  if (
    routeWithoutParams &&
    routeWithoutParams.endsWith(req.payload.config.routes.admin) &&
    req.payload.config.folders
  ) {
    redirect(
      `${req.payload.config.routes.admin}/collections/${assetsCollectionSlug}/${req.payload.config.folders.slug}`,
    )
  }

  return null
}

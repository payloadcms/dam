'use client'

import { useFolder, useFormFields, useStepNav } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import { useEffect } from 'react'

type Props = {
  assetsCollectionSlug: string
  foldersCollectionSlug: string
  adminRoute: string
}

export const RewriteHomeHrefClient = ({
  assetsCollectionSlug,
  foldersCollectionSlug,
  adminRoute,
}: Props) => {
  const { setStepNav, stepNav } = useStepNav()
  const folderID = useFormFields(([fields]) => fields.folder.value)

  useEffect(() => {
    const path: `/${string}` = `/collections/${assetsCollectionSlug}/${foldersCollectionSlug}${folderID ? `/${folderID}` : ''}`
    if (stepNav && stepNav.length > 0 && stepNav[0]?.url && !stepNav[0].url.endsWith(path)) {
      const formattedURL = formatAdminURL({
        path,
        adminRoute,
      })

      const updatedStepNav = [...stepNav]
      updatedStepNav[0] = {
        ...updatedStepNav[0],
        url: formattedURL,
      }
      setStepNav(updatedStepNav)
    }
  }, [stepNav, setStepNav, foldersCollectionSlug, assetsCollectionSlug, adminRoute, folderID])

  return null
}

import '../../../../globals.css'
import Layout from '@/app/components/Layout/Layout'
import nacelleClient from '@/app/services/nacelleClient'
import { resolveSiteData } from '@/app/utils/resolvers/resolveSiteData'
import { SITE_QUERY } from '@/app/queries/site'
import { cache } from 'react'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const getNacelleLayout = cache(async () => {
    const data = await nacelleClient
    .query({ query: SITE_QUERY })
    .then(({ data }) => {
      return resolveSiteData({ client: nacelleClient, site: data });
    });

    return data
  })

  const data = await getNacelleLayout();

  const { space, products, ...rest } = data;

  return (
    <html lang="en">
      <body>
        <Layout components={rest}>
          {children}
        </Layout>
      </body>
    </html>
  )
}

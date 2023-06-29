import '../../../../globals.css'
import Layout from '@/app/components/Layout/Layout'
import nacelleClient from '@/app/services/nacelleClient'
import { resolveSiteData } from '@/app/utils/resolvers/resolveSiteData'
import { SITE_QUERY } from '@/app/queries/site'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await nacelleClient
    .query({ query: SITE_QUERY })
    // .then(({ data }) => {
    //   return resolveSiteData({ client: nacelleClient, site: data });
    // });

  let {header, newsletter, footer } = data.data;

  if (header) {
    header = [header.edges[0].node];
  }
  if (newsletter) {
    newsletter = [newsletter.edges[0].node];
  }
  if (footer) {
    footer = [footer.edges[0].node];
  }
  
  const content = {
    header,
    newsletter,
    footer
  }

  return (
    <html lang="en">
      <body>
        <Layout components={content}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
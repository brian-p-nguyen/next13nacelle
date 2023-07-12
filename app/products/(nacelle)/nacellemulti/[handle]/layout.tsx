import '../../../../globals.css'
import Layout from '@/app/components/Layout/Layout'
import nacelleClient from '@/app/services/nacelleClient'
import { resolveSiteData } from '@/app/utils/resolvers/resolveSiteData'
import { HEADER_QUERY, NEWSLETTER_QUERY, FOOTER_QUERY } from '@/app/queries/site'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerData = nacelleClient
    .query({ query: HEADER_QUERY })

  const newsletterData = nacelleClient
    .query({ query: NEWSLETTER_QUERY })

  const footerData = nacelleClient
    .query({ query: FOOTER_QUERY })

  let [{ data: { header }}
     , { data: { newsletter }}
     , { data: { footer }}
    ] = await Promise.all([headerData, newsletterData, footerData])

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
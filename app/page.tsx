import { CONTENT_PAGE_QUERY } from './queries/contentPage';
import { resolvePageData } from './utils/resolvers/resolvePageData';
import nacelleClient from "./services/nacelleClient";
import Section from './components/Section/Section';


export default async function Home() {
  const { data } = await nacelleClient.query({
    query: CONTENT_PAGE_QUERY,
    variables: { handle: 'page-homepage' }
  });

  const { page } = await resolvePageData({
    client: nacelleClient,
    page: data.pages.edges[0]?.node
  });
  
  const fields = page?.fields || {};
  const { sections } = fields;

  return (
    page && (
      <div className="bg-white">
        {sections?.map((section, index) => (
          <div>
          <Section key={index} content={section} />
          </div>
        ))}
      </div>
    )
  )
}

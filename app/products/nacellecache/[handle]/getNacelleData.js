import { cache } from 'react'
import nacelleClient from '@/app/services/nacelleClient';
import { PRODUCT_PAGE_QUERY } from '@/app/queries/productPage';
import { resolvePageData } from '@/app/utils/resolvers/resolvePageData';

export const getNacelleData = cache(async (handle) => {
    const { data } = await nacelleClient.query({
      query: PRODUCT_PAGE_QUERY,
      variables: JSON.stringify({
        handle: handle,
        pageHandle: `page-${handle}`
      })
    });
  
    return data
  }
)

export const resolveNacelleData = cache(async (data) => {
    const { page } = await resolvePageData({
        client: nacelleClient,
        page: data?.pages.edges[0]?.node
      });
    
    return page
})
import { CONTENT_QUERY_FRAGMENT } from './content';

export const PRODUCT_ROUTES_QUERY = `
{
  products: allProducts {
    edges {
      node {
        content {
          handle
        }
      }
    }
  }
}
`;

export const PRODUCT_PAGE_QUERY = /* GraphQL */ `
  query ProductPage($handle: String!, $pageHandle: String!) {
    products: allProducts(filter: { handles: [$handle] }) {
      edges {
        node {
          nacelleEntryId
          sourceEntryId
          metafields {
            key
            value
          }
          content {
            handle
            title
            description
            options {
              name
              values
            }
            media {
              type
              src
              altText
            }
          }
          variants {
            nacelleEntryId
            sourceEntryId
            sku
            availableForSale
            price
            priceCurrency
            compareAtPrice
            quantityAvailable
            metafields {
              key
              value
            }
            content {
              title
              selectedOptions {
                name
                value
              }
              featuredMedia {
                src
                thumbnailSrc
                altText
              }
            }
          }    
        }
      }
    }
    pages: allContent(filter: { type: "pageProduct", handles: [$pageHandle] }) {
      ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;

export const PRODUCT_PAGE_CONTENT = `
  query ProductPage($filter: ContentFilterInput) {
    pages: allContent(filter: $filter) {
      ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;

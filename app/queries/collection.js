import { PRODUCT_QUERY_FRAGMENT } from './product';

export const COLLECTION_PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $after: String!) {
    collections: allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          products: productConnection(first: 12, after: $after) {
            pageInfo {
              endCursor
              hasNextPage
            }
            ${PRODUCT_QUERY_FRAGMENT}
          }
        }
      }
    }
  }
`;

export const COLLECTION_PRODUCTS_QUERY2 = `
  query allProductCollections {
  allProductCollections(filter: {} ) {
    edges {
      node {
        sourceEntryId
        nacelleEntryId
        content {
          title
          handle
        }
        productConnection {
          edges {
            node {
              content {
                title
                handle
              }
              variants {
                productHandle
                price
                content {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const COLLECTION_PRODUCTS_UPSELL = `
  query CollectionProducts($nacelleEntryIds: String!) {
    collections: allProductCollections(filter: { nacelleEntryIds: [$nacelleEntryIds] }) {
      edges {
        node {
          products: productConnection(first: 12) {
            pageInfo {
              endCursor
              hasNextPage
            }
            ${PRODUCT_QUERY_FRAGMENT}
          }
        }
      }
    }
  }
`;

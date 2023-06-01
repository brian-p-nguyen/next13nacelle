export const PRODUCT_QUERY_FRAGMENT = /* GraphQL */ `
edges {
  node {    
    nacelleEntryId
    sourceEntryId
    availableForSale
    productType
    metafields {
      key
      value
		}
    content {
      handle
      title
      options {
        name
        values
      }
      featuredMedia {
        src
        thumbnailSrc
        altText
      }
    }
    variants {
      nacelleEntryId
      sourceEntryId
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
        locale
        featuredMedia {
          src
          thumbnailSrc
          altText
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
}
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($handles: [String!]) {
    products: allProducts(filter: { handles: $handles }) {
      ${PRODUCT_QUERY_FRAGMENT}
    }
  }
`;

export const PRICE_VALIDATION_QUERY = /* GraphQL */ `
  query PriceValidation($handles: [String!]) {
    allProducts(filter: { handles: $handles }) {
      edges {
        __typename
        node {
          content {
            handle
          }
          variants {
            nacelleEntryId
            availableForSale
            price
            priceCurrency
          }
        }
      }
    }
  }
`;

export const VARIANT_IDS_QUERY = /* GraphQL */ `
  query VariantIds($productId: String!) {
    allProducts(filter: { nacelleEntryIds: [$productId] }) {
      edges {
        node {
          variants {
            nacelleEntryId
          }
        }
      }
    }
  }
`;

export const PRODUCT_DATA_FOR_STRIPE_QUERY = /* GraphQL */ `
  query ProductDataForStripe(
    $handles: [String!]
    $after: String
    $first: Int = 100
  ) {
    allProducts(filter: { after: $after, first: $first, handles: $handles }) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          content {
            description
            handle
            metafields {
              key
              value
            }
            options {
              name
              values
            }
            title
          }
          variants {
            content {
              description
              featuredMedia {
                src
              }
              media {
                src
              }
              selectedOptions {
                name
                value
              }
            }
            metafields {
              key
              value
            }
            nacelleEntryId
            price
            priceCurrency
          }
        }
      }
    }
  }
`;

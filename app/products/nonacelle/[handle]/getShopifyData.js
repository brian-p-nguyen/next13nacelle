  // Remap shopify data to be used in product components
const transformProduct = (shopifyProduct) => {
    // console.log('shopifyProduct', shopifyProduct)
    const { data: { product } } = shopifyProduct

    // Update variant shape
    product.variants = product.variants.edges.map(({ node }) => {
        node.price = Number(node?.price?.amount)
        node.compareAtPrice = Number(node?.compareAtPrice?.amount)
        node.content = {
        selectedOptions: node.selectedOptions,
        featuredMedia: {
            src: node.image.url
        }
        }

        return node
    })

    // Add back in content field
    product.content = {
        title: product.title,
        handle: product.handle,
        options: product.options,
        description: product.description,
        media: product.media.edges.map(({ node }) => {
        return {
            type: node.mediaContentType,
            src: node.previewImage.url,
        }
        })
    }

    // Clean up 
    delete product.handle;
    delete product.title;
    delete product.options;
    delete product.description;

    return product
}

export const getShopifyProduct = (handle) => {
    const shopifyProduct = fetch('https://nacelle-international.myshopify.com/api/2023-04/graphql.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': 'bc9ecf8fd6b77893805f6a61990331e9'
      },
      body: JSON.stringify({
        query: `
          query {
            product(handle: "${handle}") {
              id
              availableForSale
              title
              handle
              description
              media(first: 50) {
                edges {
                  node {
                    mediaContentType
                    previewImage {
                      url
                    }
                  }
                }
              }
              featuredImage {
                url
              }
              options {
                name
                values
              }
              variants (first: 100) {
                edges {
                  node {
                    availableForSale
                    quantityAvailable
                    image {
                      url
                    }
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        `
      })
    }).then((res) => res.json())
    .then((product) => transformProduct(product))

    return shopifyProduct
}
import nacelleClient from "../../../services/nacelleClient";
import contentfulClient from "../../../services/contentfulClient";
import { PRODUCT_PAGE_QUERY, PRODUCT_ROUTES_QUERY } from '../../../queries/productPage';
import { resolvePageData } from '../../../utils/resolvers/resolvePageData';
import { ProductProvider } from '../../../context/Product';
import ProductDetails from '../../../components/Product/ProductDetails';
import ProductReview from '../../../components/Product/ProductReview';
import Section from '../../../components/Section/Section';

export async function generateStaticParams() {
  // const { data } = await nacelleClient.query({
  //   query: PRODUCT_ROUTES_QUERY
  // });   

  // const paths = data?.products?.edges
  //   .filter((product: { node: { content: { handle: any; }; }; }) => product.node.content?.handle)
  //   .map((product: { node: { content: { handle: any; }; }; }) => ({ handle: product.node.content?.handle } ));

  // console.log(paths)
  return [{handle: 'otto-shirt'}]
}

async function getShopifyData(handle) {
  const shopifyData = fetch('https://nacelle-international.myshopify.com/api/2023-04/graphql.json', {
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

  return shopifyData
}

// Remap shopify data to be used in product components
function transformProduct(product) {
  // Update variant shape
  product.variants = product.variants.edges.map(({ node }) => {
    node.price = node.price.amount
    node.content = {
      selectedOptions: node.selectedOptions
    }

    return node
  })

  // Add back in content field
  product.content = {
    title: product.title,
    handle: product.handle,
    options: product.options,
    media: [product.featuredImage],
    description: product.description
  }

  // Clean up 
  delete product.handle;
  delete product.title;
  delete product.options;
  delete product.description;

  return product
}

async function getContentfulData(handle) {
  const data = await contentfulClient.getEntries({
    content_type: 'pageProduct',
    'fields.handle[like]': `page-${handle}`
  })

  return data
}

// Remap shopify data to be used in product components
function transformContent(content) {
  // Update Sections
  content.sections = content.sections.map((section) => {
    section.type = section.sys.contentType.sys.id
    return section
  })

  // Add Fields
  content.fields = {
      features: content.features
  }


  // Clean up
  delete content.features;

  return content
}

export default async function Page({ params }) {
  const handle = params?.handle;

  // Shopify 
  const shopifyData = await getShopifyData(handle)
  const { data: { product } } = shopifyData
  // console.log('product', product)
  const updatedProduct = transformProduct(product)
  // console.log('updatedProduct', updatedProduct)

  // Contentful
  const contentfulData = await getContentfulData(handle)
  const content = contentfulData.items[0].fields
  console.log('content', content)
  const updatedContent = transformContent(content)
  console.log('updatedContent', updatedContent)

  const sections = content.sections
  
  // console.log('sections', sections)

  const productid = product.id;
  const price = product.variants[0].price;
  const currency = 'USD';
  const url =
    'https://next-magento-cms-stripe.vercel.app/' +
    'products/' +
    product.handle;
  const imageurl = product.content?.media[0].url;

  return (
    product && (
      <div className="bg-white">
        <ProductProvider product={product} key={product.id}>
          <ProductDetails content={content} />
        </ProductProvider>
        {sections?.map((section, index) => (
          <Section key={index} content={section} />
        ))}

        <ProductReview
          productid={productid}
          price={price}
          currency={currency}
          name={product.content?.title}
          url={url}
          imageurl={imageurl}
        />
      </div>
    )
  );
}
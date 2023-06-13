import { ProductProvider } from '@/app/context/Product';
import ProductDetails from '@/app/components/Product/ProductDetails';
import ProductReview from '@/app/components/Product/ProductReview';
import Section from '@/app/components/Section/Section';
import { getShopifyProduct} from "./getShopifyData";
import { getContentfulData } from "./getContentfulData";

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

export default async function Page({ params }) {
  const handle = params?.handle;

  // Shopify 
  const product = await getShopifyProduct(handle)

  // Contentful
  const content = await getContentfulData(handle)
  
  const sections = content.fields.sections
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
import nacelleClient from "@/app/services/nacelleClient";
import { PRODUCT_PAGE_QUERY, PRODUCT_ROUTES_QUERY } from '@/app/queries/productPage';
import { ProductProvider } from '@/app/context/Product';
import ProductDetails from '@/app/components/Product/ProductDetails';
import ProductReview from '@/app/components/Product/ProductReview';
import Section from '@/app/components/Section/Section';
import { getNacelleData, resolveNacelleData } from './getNacelleData'

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
  
  // Cached functions
  const { products, page } = await getNacelleData(handle)

  // Set Variables
  const product = products.edges[0].node
  const fields = page?.fields || {};
  const { sections, ...rest } = fields ;
  const content = { fields: rest };
  const productid = product.nacelleEntryId.replace('=', '');
  const price = product.variants[0].price;
  const currency = 'USD';
  const url =
    'https://next-magento-cms-stripe.vercel.app/' +
    'products/' +
    product.content?.handle;
  const imageurl = product.content?.media[0].src;

  return (
    product && (
      <div className="bg-white">
        <ProductProvider product={product} key={product.nacelleEntryId}>
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
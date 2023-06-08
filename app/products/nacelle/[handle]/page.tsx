import nacelleClient from "../../../services/nacelleClient";
import { PRODUCT_PAGE_QUERY, PRODUCT_ROUTES_QUERY } from '../../../queries/productPage';
import { resolvePageData } from '../../../utils/resolvers/resolvePageData';
import { ProductProvider } from '../../../context/Product';
import ProductDetails from '../../../components/Product/ProductDetails';
import ProductReview from '../../../components/Product/ProductReview';
import Section from '../../../components/Section/Section';
import type {
  Content,
  ContentEdge,
  Product,
  ProductEdge
} from '@nacelle/commerce-queries-plugin';

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

export default async function Page({ params }: { params: { handle: string } }) {
  const handle = params?.handle;
  
  const { data } = await nacelleClient.query({
      query: PRODUCT_PAGE_QUERY,
      variables: JSON.stringify({
        handle: handle,
        pageHandle: `page-${handle}`
      })
    });
  
  const { page } = await resolvePageData({
    client: nacelleClient,
    page: data?.pages.edges[0]?.node
  });

  const product = data.products.edges[0].node
  const fields = page?.fields || {};
  const { sections, ...rest } = fields as { sections: Array<{ type: string }> };
  const content: Pick<Content, 'fields'> = { fields: rest };
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
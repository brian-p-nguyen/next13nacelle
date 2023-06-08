import Link from 'next/link';
import { ProductProvider } from '../../context/Product';
import ProductCard from '../Product/ProductCard';

const FeaturedProductsSmall = ({ content }) => {
  //console.log('content of featuredProductsSmall', content);

  return (
    content && (
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <div className="flex items-baseline justify-between">
            {content.fields.heading && (
              <h2 className="text-lg font-extrabold tracking-tight text-gray-900">
                {content.fields.heading}
              </h2>
            )}
            {content.fields.linkUrl && (
              <Link
                href={content.fields.linkUrl}
                className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 block"
              >
                {content.fields.linkText}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            )}
          </div>
          <div
            className="
            mt-6
            grid 
            gap-y-10
            grid-cols-2
            gap-x-6
          "
          >
            {content.fields.products.slice(0, 2).map((product) => (
              <ProductProvider product={product} key={product.nacelleEntryId}>
                <ProductCard />
              </ProductProvider>
            ))}
          </div>
          <div className="mt-6 sm:hidden">
            {content.fields.linkUrl && (
              <Link
                href={content.fields.linkUrl}
                className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {content.fields.linkText}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProductsSmall;

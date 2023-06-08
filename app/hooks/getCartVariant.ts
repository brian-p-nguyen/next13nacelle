import type {
  Product,
  ProductContent,
  Variant,
  VariantContent
} from '@nacelle/commerce-queries-plugin';

export type CartVariant = Pick<
  Variant,
  'availableForSale' | 'price' | 'priceCurrency' | 'sku' | 'compareAtPrice'
> &
  Pick<
    VariantContent,
    'featuredMedia' | 'selectedOptions' | 'nacelleEntryId' | 'metafields'
  > & {
    productHandle: ProductContent['handle'];
    productTitle: ProductContent['title'];
    productMetaFields: ProductContent['metafields'];
    variantId: VariantContent['sourceEntryId'];
    variantTitle: VariantContent['title'];
  };

interface GetCartVariantParams {
  product: Product;
  variant: Variant;
}

export const getCartVariant = ({
  product,
  variant
}: GetCartVariantParams): CartVariant => {
  if (!product) {
    throw new Error('Missing `product` in `getCartVariant`');
  }

  if (!variant) {
    throw new Error('Missing `product` in `getCartVariant`');
  }

  const { metafields: productMetaFields } = product;

  const {
    handle: productHandle,
    title: productTitle,
    featuredMedia: productFeaturedMedia
  } = product.content || {};

  const {
    availableForSale,
    compareAtPrice,
    sourceEntryId,
    price,
    priceCurrency,
    sku,
    nacelleEntryId
  } = variant;

  const {
    featuredMedia,
    selectedOptions,
    title: variantTitle
  } = variant.content || {};

  return {
    availableForSale,
    compareAtPrice,
    variantId: sourceEntryId,
    variantTitle,
    price,
    priceCurrency,
    sku,
    featuredMedia: featuredMedia || productFeaturedMedia,
    selectedOptions: selectedOptions ?? [],
    productHandle,
    productTitle,
    productMetaFields,
    nacelleEntryId,
    metafields: []
  };
};

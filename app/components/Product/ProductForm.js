import { useProduct } from '../../hooks/useProduct';
// import { useCart } from 'hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { getCartVariant } from '../../utils/getCartVariant';
import ProductExpandable from './ProductExpandable';

const ProductForm = ({ content, setImagesArray }) => {
  const { product, selectedOptions, setSelectedOptions, selectedVariant } =
    useProduct();

  // const { checkoutProcessing, addItem } = useCart();

  const options =
    product?.content?.options?.find((option) => {
      return option.values.length > 1;
    }) && product?.content?.options;

  const price = formatPrice({ price: selectedVariant?.price });
  const compareAtPrice = formatPrice({
    price: selectedVariant?.compareAtPrice
  });

  let quantityAvailableTemp = 10;
  if (Number.isInteger(selectedVariant?.quantityAvailable)) {
    quantityAvailableTemp = selectedVariant?.quantityAvailable;
  }

  const quantityAvailable = quantityAvailableTemp;
  const features = content?.fields?.features;

  const handleOptionChange = (e, option) => {
    let options = [...selectedOptions];
    const newOption = { name: option.name, value: e.target.value };

    if (option.name.toUpperCase() === 'COLOR') {
      //Then search for this color in the product variants array and set the curSrc and alttxt
      for (var i = 0; i < product.variants.length; i++) {
        let thisColor = product.variants[i].content?.selectedOptions?.filter(
          (x) => x.name.toUpperCase() === 'COLOR'
        );
        if (thisColor) {
          if (thisColor[0].value === e.target.value) {
            //Reset color here and break out of for
            let imageArr = product?.content?.media?.filter(
              (media) => media.type === 'IMAGE'
            );

            if (imageArr.length > 0) {
              //set first image as the color image now
              imageArr[0].src = product.variants[i].content.featuredMedia.src;
            }

            //Reset parent image state
            setImagesArray(imageArr);
            break;
          }
        }
      }
    }

    const optionIndex = options.findIndex((selectedOption) => {
      return selectedOption.name === newOption.name;
    });
    if (optionIndex > -1) options[optionIndex] = newOption;
    else options = [...options, newOption];
    setSelectedOptions({ options });
  };

  const handleAddItem = () => {
    addItem({
      ...getCartVariant({
        product: product,
        variant: selectedVariant
      }),
      quantity: 1
    });
  };

  return (
    product && (
      <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {product.content.title}
        </h1>
        <div className="mt-3">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl text-gray-900">
            {price && (
              <span
                className={
                  compareAtPrice && compareAtPrice != price && 'text-red-600'
                }
              >
                {price}
              </span>
            )}
            {compareAtPrice && compareAtPrice != price && (
              <span className="ml-2 line-through">{compareAtPrice}</span>
            )}
          </p>
        </div>
        {product.content?.description && (
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>

            <div
              className="text-base text-gray-700 space-y-6"
              dangerouslySetInnerHTML={{ __html: product.content.description }}
            ></div>
          </div>
        )}
        <form className="mt-6">
          {options &&
            options.map((option) => (
              <div key={option.name} className="max-w-xs">
                <h3 className="font-medium text-sm text-gray-700">
                  {option.name}
                </h3>
                <fieldset className="mt-2">
                  <legend className="sr-only">Choose a {option.name}</legend>
                  <select
                    className="
                  mt-1
                  block
                  w-full
                  pl-3
                  pr-10
                  py-2
                  text-base
                  border-gray-300
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                  sm:text-sm
                  rounded-md
                "
                    onChange={(e) => handleOptionChange(e, option)}
                  >
                    {option.values.map((value, vIndex) => (
                      <option key={vIndex}>{value}</option>
                    ))}
                  </select>
                </fieldset>
              </div>
            ))}
          <div className="mt-10 flex">
            <button
              type="button"
              disabled={
                !selectedVariant?.availableForSale ||
                // checkoutProcessing ||
                quantityAvailable == 0
              }
              className="
              max-w-xs
              flex-1
              bg-indigo-600
              border border-transparent
              rounded-md
              py-3
              px-8
              flex
              items-center
              justify-center
              text-base
              font-medium
              text-white
              hover:bg-indigo-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-offset-gray-50
              focus:ring-indigo-500
              sm:w-full
            "
              onClick={handleAddItem}
            >
              {selectedVariant?.availableForSale && quantityAvailable > 0 ? (
                <span>Add to bag</span>
              ) : (
                <span>Out of stock</span>
              )}
            </button>
          </div>
        </form>
        <section aria-labelledby="details-heading" className="mt-12">
          <h2 id="details-heading" className="sr-only">
            Additional details
          </h2>

          <div className="border-t divide-y divide-gray-200">
            {features && <ProductExpandable features={features} />}
          </div>
        </section>
      </div>
    )
  );
};

export default ProductForm;

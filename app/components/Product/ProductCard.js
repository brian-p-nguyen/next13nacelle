import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProduct } from '../../hooks/useProduct';
// import { useCart } from 'hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import { getCartVariant } from '../../utils/getCartVariant';

const ProductCard = ({ customSrc }) => {
  const [isHovered, setIsHovered] = useState(false);

  // const { addItem } = useCart();
  const { product, selectedOptions, setSelectedOptions, selectedVariant } =
    useProduct();

  let tempSrc = '';

  const [curSrc, setCurSrc] = useState(
    selectedVariant?.content?.featuredMedia?.src
  );

  useEffect(() => {
    if (customSrc) {
      setCurSrc(customSrc);
    }
  }, [customSrc]);

  const [curAltTxt, setCurAltTxt] = useState(
    selectedVariant?.content?.featuredMedia?.altText
  );

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
  const handleHover = (val) => setIsHovered(val);

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
            setCurSrc(product.variants[i].content?.featuredMedia?.src);
            setCurAltTxt('alt');
            break;
          }
        }
      }
    }

    //console.log('newOption', newOption);
    //console.log('product', product);

    const optionIndex = options.findIndex((selectedOption) => {
      return selectedOption.name === newOption.name;
    });
    if (optionIndex > -1) options[optionIndex] = newOption;
    else options = [...options, newOption];
    setSelectedOptions({ options });
  };

  const handleAddItem = () => {
    // addItem({
    //   ...getCartVariant({
    //     product: product,
    //     variant: selectedVariant
    //   }),
    //   quantity: 1
    // });
  };

  const spanStyle = {
    boxSizing: 'border-box',
    display: 'block',
    overflow: 'hidden',
    width: 'initial',
    height: 'initial',
    background: 'none',
    opacity: 1,
    border: '0px',
    margin: '0px',
    padding: '0px',
    position: 'absolute',
    inset: '0px'
  };

  const imgStyle = {
    position: 'absolute',
    inset: '0px',
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0px',
    height: '0px',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit: 'cover'
  };

  const imgAltStyle = {
    position: 'absolute',
    inset: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%'
  };

  return (
    product && (
      <div
        className="cursor-pointer"
        tabIndex="0"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onFocus={() => handleHover(true)}
        onBlur={() => handleHover(true)}
      >
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <Link
              href={`/products/${product.content?.handle}`}
              className="text-base text-gray-500 hover:text-gray-900 hover:opacity-75 focus:opacity-75"
            >
              <span className="sr-only">{product.content?.title}</span>
              <span style={spanStyle}>
                <Image
                  src={curSrc}
                  alt={curAltTxt}
                  quality={80}
                  sizes="100vw"
                  width="0"
                  height="0"
                  style={imgStyle}
                />
              </span>
            </Link>
          </div>
        </div>
        {isHovered && (
          <div>
            {options?.map((option) => (
              <div key={option.name}>
                <select
                  className="
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
                mt-3
              "
                  onChange={(e) => handleOptionChange(e, option)}
                >
                  {option.values.map((value, vIndex) => (
                    <option key={vIndex} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button
              type="button"
              disabled={
                !selectedVariant?.availableForSale || quantityAvailable == 0
              }
              className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 w-full mt-3"
              onClick={handleAddItem}
            >
              {selectedVariant?.availableForSale && quantityAvailable > 0 ? (
                <div>Add to Cart</div>
              ) : (
                <div>Out of Stock</div>
              )}
            </button>
          </div>
        )}
        {!isHovered && (
          <div>
            <h3 className="mt-4 text-sm text-gray-700">
              {product.content?.title}
            </h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {price && (
                <span
                  className={
                    compareAtPrice && compareAtPrice != price
                      ? 'text-red-600'
                      : ''
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
        )}
      </div>
    )
  );
};

export default ProductCard;

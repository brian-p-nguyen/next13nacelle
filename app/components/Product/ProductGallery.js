import Image from 'next/image';
import { useState } from 'react';
import { useProduct } from '../../hooks/useProduct';

const ProductGallery = (props) => {
  const { product, selectedOptions, setSelectedOptions, selectedVariant } =
    useProduct();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  //console.log('product', product);

  const handleImageClick = (index) => {
    setActiveImageIndex(index);
    //get a new image for the first elements of the array
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
    product.content.media.length && (
      <div className="flex flex-col-reverse">
        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <div
            className="grid grid-cols-4 gap-6"
            aria-orientation="horizontal"
            role="tablist"
          >
            {product.content.media.map((image, index) => (
              <button
                id={`tabs-1-tab-${index}`}
                key={image.src}
                className="
              relative
              h-24
              bg-white
              rounded-md
              flex
              items-center
              justify-center
              text-sm
              font-medium
              uppercase
              text-gray-900
              cursor-pointer
              hover:bg-gray-50
              focus:outline-none
              focus:ring
              focus:ring-offset-4
              focus:ring-opacity-50
            "
                aria-controls={`tabs-1-panel-${index}`}
                role="tab"
                type="button"
                onClick={() => handleImageClick(index)}
              >
                <span className="sr-only">{image.altText}</span>
                <span style={spanStyle}>
                  <Image
                    src={image.src}
                    alt="Product Img"
                    quality={80}
                    sizes="100vw"
                    width="0"
                    height="0"
                    style={imgStyle}
                  />
                </span>

                <span
                  className={`${
                    activeImageIndex === index
                      ? 'ring-indigo-500'
                      : 'ring-transparent'
                  } absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none`}
                  aria-hidden="true"
                ></span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full aspect-w-1 aspect-h-1">
          {product.content.media.map((image, index) => (
            <div
              id={`tabs-1-panel-${index}`}
              key={image.src}
              aria-labelledby={`tabs-1-panel-${index}`}
              role="tabpanel"
              tabIndex="0"
              className={index !== activeImageIndex ? 'hidden' : ''}
            >
              <span style={spanStyle}>
                <Image
                  src={image.src}
                  alt="Product Img"
                  quality={80}
                  sizes="100vw"
                  width="0"
                  height="0"
                  style={imgStyle}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ProductGallery;

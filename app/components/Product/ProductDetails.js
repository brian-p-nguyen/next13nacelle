"use client";

import ProductGallery from './ProductGallery';
import ProductForm from './ProductForm';
import { useProduct } from '../../hooks/useProduct';
import { useState } from 'react';

const ProductDetails = ({ content }) => {
  const { product, selectedOptions, setSelectedOptions, selectedVariant } =
    useProduct();

  const [curSrc, setCurSrc] = useState(
    selectedVariant?.content?.featuredMedia?.src
  );

  const initialImages = product?.content?.media?.filter(
    (media) => media.type === 'IMAGE'
  );

  //set initial product image src
  if (initialImages.length > 0) {
    initialImages[0].src = selectedVariant?.content?.featuredMedia?.src;
  }

  const [images, setImagesArray] = useState(initialImages);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <ProductGallery images={images} />
          <ProductForm content={content} setImagesArray={setImagesArray} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

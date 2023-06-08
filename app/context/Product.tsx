"use client";

import { createContext, useState } from 'react';
import { getSelectedVariant } from '../utils/getSelectedVariant';
import type { FC, Key, ReactElement } from 'react';
import type {
  Product,
  Variant,
  VariantContent
} from '@nacelle/commerce-queries-plugin';
import { AnyARecord } from 'dns';

interface IProductContext {
  product: Product;
  selectedOptions: VariantContent['selectedOptions'] | undefined;
  setSelectedOptions: SetSelectedOptions;
  selectedVariant: Variant | undefined;
  setSelectedVariant: SetSelectedVariant;
}

type SetSelectedOptions = ({
  options
}: {
  options: VariantContent['selectedOptions'];
}) => void;

type SetSelectedVariant = ({ variant }: { variant: Variant }) => void;

export const ProductContext = createContext<IProductContext>(
  {} as IProductContext
);

export const ProductProvider: FC<{
  children: ReactElement | ReactElement[];
  product: Product;
  key: Key;
}> = ({ children, product }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    product.variants?.at(0)?.content?.selectedOptions
  );

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.at(0)
  );

  const handleSetSelectedOptions: SetSelectedOptions = ({ options }) => {
    if (Array.isArray(options)) {
      setSelectedOptions(options);
      setSelectedVariant(getSelectedVariant({ product, options }));
    }
  };

  const handleSetSelectedVariant: SetSelectedVariant = ({ variant }) => {
    setSelectedVariant(variant);

    if (variant.content?.selectedOptions) {
      setSelectedOptions(variant.content.selectedOptions);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        selectedOptions,
        setSelectedOptions: handleSetSelectedOptions,
        selectedVariant,
        setSelectedVariant: handleSetSelectedVariant
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

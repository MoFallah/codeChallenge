import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { MinBestRateByType, Product } from "../../../types";

export const selectProducts = (state: RootState) => state.products.items;
export const selectIsProductsLoading = (state: RootState) => state.products.loading;
export const selectSelectedProductType = (state: RootState) => state.products.selectedProductType;


export const selectMinBestRateByType = createSelector(
  [selectProducts],
  (products): MinBestRateByType => {
    if (!products || !Array.isArray(products)) {
      return {
        FIXED: undefined,
        VARIABLE: undefined
      };
    }

    const findMinRateProducts = (type: 'FIXED' | 'VARIABLE'): Product | undefined => {
      const typeProducts = products.filter(product => product.type === type);
      if (typeProducts.length === 0) return undefined;

      const minRate = Math.min(...typeProducts.map(p => p.bestRate));
      return typeProducts.find(product => product.bestRate === minRate);
    };

    return {
      FIXED: findMinRateProducts('FIXED'),
      VARIABLE: findMinRateProducts('VARIABLE')
    };
  }
);
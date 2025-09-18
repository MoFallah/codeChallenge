import type { RootState } from '..';
import type { Product } from '../../../types';
import {
  selectProducts,
  selectIsProductsLoading,
  selectSelectedProductType,
  selectMinBestRateByType,
} from '../selectors/productsSelectors';

const products = [
  {
    id: 12345,
    name: "MCAP Value-Flex Variable Special",
    type: "VARIABLE",
    bestRate: 1.25,
  },
  {
    id: 12347,
    name: "MCAP Value-Flex Fixed Special",
    type: "FIXED",
    bestRate: 2.04,
  },
  {
    id: 12348,
    name: "Standard (Quick Close Special)",
    type: "FIXED",
    bestRate: 2.14,
  },
] as unknown as Product[];

describe('ProductsSelectors', () => {
  it('selectProducts returns products.items', () => {
    const state = { products: { items: products } } as unknown as RootState;
    expect(selectProducts(state)).toEqual(products);
  });

  it('selectIsProductsLoading returns products.loading', () => {
    const state = { products: { loading: true } } as unknown as RootState;
    expect(selectIsProductsLoading(state)).toBe(true);
  });

  it('selectSelectedProductType returns products.selectedProductType', () => {
    const state = { products: { selectedProductType: 'FIXED' } } as unknown as RootState;
    expect(selectSelectedProductType(state)).toBe('FIXED');
  });

  it('selectMinBestRateByType returns min bestRate products by type', () => {
    const state = { products: { items: products } } as unknown as RootState;
    const result = selectMinBestRateByType(state);
    expect(result.FIXED?.bestRate).toBe(2.04);
    expect(result.FIXED?.name).toBe("MCAP Value-Flex Fixed Special");
    expect(result.VARIABLE?.bestRate).toBe(1.25);
    expect(result.VARIABLE?.name).toBe("MCAP Value-Flex Variable Special");
  });

  it('selectMinBestRateByType returns undefined for types with no products', () => {
    const state = { products: { items: [products[0]] } } as unknown as RootState;
    const result = selectMinBestRateByType(state);
    expect(result.FIXED).toBeUndefined();
    expect(result.VARIABLE?.bestRate).toBe(1.25);
  });

  it('selectMinBestRateByType returns correct product when multiple FIXED types', () => {
    const state = { products: { items: products } } as unknown as RootState;
    const result = selectMinBestRateByType(state);
    expect(result.FIXED?.bestRate).toBe(2.04);
  });

  it('selectMinBestRateByType returns undefined for both types if products is empty', () => {
    const state = { products: { items: [] } } as unknown as RootState;
    const result = selectMinBestRateByType(state);
    expect(result.FIXED).toBeUndefined();
    expect(result.VARIABLE).toBeUndefined();
  });

  it('selectMinBestRateByType returns undefined for both types if products is not an array', () => {
    const state = { products: { items: null } } as unknown as RootState;
    const result = selectMinBestRateByType(state);
    expect(result.FIXED).toBeUndefined();
    expect(result.VARIABLE).toBeUndefined();
  });
});
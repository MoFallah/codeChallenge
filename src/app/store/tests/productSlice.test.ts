import productsReducer, {
  setSelectedProductType,
  fetchProducts,
} from './../slices/productsSlice';
import type { Product } from '../../../types';

const initialState = {
  items: [],
  loading: false,
  selectedProductType: '',
};

const products: Product[] = [
  { id: 1, name: 'Product 1', type: 'FIXED', bestRate: 2.0 },
  { id: 2, name: 'Product 2', type: 'VARIABLE', bestRate: 1.5 },
] as unknown as Product[];

describe('unit', () => {
  it('should return initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should set selectedProductType', () => {
    const action = setSelectedProductType('FIXED');
    const state = productsReducer(initialState, action);
    expect(state.selectedProductType).toBe('FIXED');
  });
});

describe('acceptance', () => {
  it('should set loading true on fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = productsReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should set items and loading false on fetchProducts.fulfilled', () => {
    const action = { type: fetchProducts.fulfilled.type, payload: products };
    const state = productsReducer({ ...initialState, loading: true }, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(products);
  });
});

describe('exception', () => {
  it('should not change items or selectedProductType on unknown action', () => {
    const action = { type: 'unknown_action' };
    const state = productsReducer(initialState, action);
    expect(state.items).toEqual([]);
    expect(state.selectedProductType).toBe('');
  });

  it('should keep previous items if fetchProducts.pending is dispatched after fulfilled', () => {
    const fulfilledState = productsReducer(initialState, {
      type: fetchProducts.fulfilled.type,
      payload: products,
    });
    const pendingState = productsReducer(fulfilledState, {
      type: fetchProducts.pending.type,
    });
    expect(pendingState.items).toEqual(products);
    expect(pendingState.loading).toBe(true);
  });
});
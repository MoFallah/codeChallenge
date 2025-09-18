import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../../types';
import { getProducts } from '../../../api/apis';

interface ProductsState {
  items: Product[];
  loading: boolean;
  selectedProductType: Product['type'] | '';
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  selectedProductType: '',
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProductType: (state, action) => {
      state.selectedProductType = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
  },
});
export const { setSelectedProductType } = productsSlice.actions;
export default productsSlice.reducer;

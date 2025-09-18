import { createSlice } from '@reduxjs/toolkit';

const uiStateSlice = createSlice({
  name: 'uiState',
  initialState: {
    theme: 'light',
    language: 'en',
    error: null,
    toastId: null
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload.message;
      state.toastId = action.payload.toastId;
    },
    clearError: (state) => {
      state.error = null;
      state.toastId = null;
    }
  },
});

export const {
  setLanguage, setError, clearError
} = uiStateSlice.actions;
export default uiStateSlice.reducer;

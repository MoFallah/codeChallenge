import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import applicationsReducer from './slices/applicationsSlice';
import uiStateReducer from './slices/uiStateSlice';
import toastMiddleware from './middleware/toastMiddleware';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    applications: applicationsReducer,
    uiState: uiStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toastMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



/////
// src/store/index.ts
// import { configureStore } from '@reduxjs/toolkit';
// import languageReducer from './languageSlice';

// export const store = configureStore({
//   reducer: {
//     language: languageReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
/////
// src/store/languageSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface LanguageState {
//   code: string;
// }

// const initialState: LanguageState = {
//   code: 'en', // Default language
// };

// const languageSlice = createSlice({
//   name: 'language',
//   initialState,
//   reducers: {
//     setLanguage: (state, action: PayloadAction<string>) => {
//       state.code = action.payload;
//     },
//   },
// });

// export const { setLanguage } = languageSlice.actions;
// export default languageSlice.reducer;


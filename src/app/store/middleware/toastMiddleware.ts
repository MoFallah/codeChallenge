import { setError } from '../slices/uiStateSlice';

const toastMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('/rejected')) {
    const errorMessage = action.payload || 'An error occurred';
    store.dispatch(setError({message: errorMessage, toastId: action.type}));
  }
  return next(action);
}

export default toastMiddleware;
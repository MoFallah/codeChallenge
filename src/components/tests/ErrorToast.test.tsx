import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import uiStateReducer from '../../app/store/slices/uiStateSlice';
import { toast } from 'react-toastify';
import ErrorToast from '../ErrorToast/ErrorToast';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('ErrorToast', () => {
  it('Should renders nothing', () => {
    const store = configureStore({ reducer: { uiState: uiStateReducer } });
    const { container } = render(
      <Provider store={store}>
        <ErrorToast />
      </Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('Should show toast when error and toastId are present', () => {
    const store = configureStore({
      reducer: { uiState: uiStateReducer },
      preloadedState: { uiState: { error: 'Test error', toastId: 'toast-1', theme: '', language: 'en' } }
    });

    render(
      <Provider store={store}>
        <ErrorToast />
      </Provider>
    );

    expect(toast.error).toHaveBeenCalled();
    const callArgs = (toast.error as any).mock.calls[0];
    expect(callArgs[1].toastId).toBe('toast-1');
    expect(typeof callArgs[1].onClose).toBe('function');
  });
});
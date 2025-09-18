import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'; // adjust path if needed
import uiStateReducer from '../../app/store/slices/uiStateSlice';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';

function renderWithProviders(
  ui: React.ReactElement,
  options?: { preloadedState?: any }
) {
  const store = configureStore({
    reducer: { uiState: uiStateReducer },
    preloadedState: options?.preloadedState,
  });
  return {
    ...render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          {ui}
        </I18nextProvider>
      </Provider>
    ),
    store,
  };
}

describe('LanguageSelector', () => {
  it('renders language buttons', () => {
    renderWithProviders(<LanguageSelector />);

    expect(screen.getByText('🇬🇧')).toBeInTheDocument();
    expect(screen.getByText('🇫🇷')).toBeInTheDocument();
  });

  it('Should highlight the selected language', () => {
    renderWithProviders(<LanguageSelector />, { preloadedState: { uiState: { language: 'fr' } } });

    const frButton = screen.getByText('🇫🇷');
    expect(frButton).toHaveStyle('background: #007bff');
  });

  it('Should dispatch setLanguage and call i18n.changeLanguage on click', () => {
    const spy = vi.spyOn(i18n, 'changeLanguage');
    const { store } = renderWithProviders(<LanguageSelector />);

    const frButton = screen.getByText('🇫🇷');
    fireEvent.click(frButton);
    expect(store.getState().uiState.language).toBe('fr');
    expect(spy).toHaveBeenCalledWith('fr');
  });
});

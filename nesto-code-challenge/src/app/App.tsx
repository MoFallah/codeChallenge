import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { ToastContainer } from 'react-toastify';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { ApplicationEditPage } from '../pages/ApplicationEditPage/ApplicationEditPage';
import ErrorToast from '../components/ErrorToast/ErrorToast';
import { ApplicationListPage } from '../pages/ApplicationListPage/ApplicationListPage';
import { useTranslation } from 'react-i18next';
import { AppWrapper, HeaderWrapper, Logo, NavWrapper } from './App.styles';
import { LanguageSelector } from '../components/LanguageSelector/LanguageSelector';

function App() {
  const { t } = useTranslation();
  const language = i18n.language || 'en';

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <>
          <HeaderWrapper>
            <NavWrapper>
              <Link to="/products">{t('selectProduct')}</Link>
              <Link to="/applications">{t('viewApplications')}</Link>
            </NavWrapper>
            <Logo src={`https://www.nesto.ca/wp-content/themes/nesto/templates/objects/logo-nesto-${language}.svg`} alt={t('logo')} />
            <LanguageSelector />
          </HeaderWrapper>
          <ToastContainer
            position="top-right"
            theme="light"
            draggable
            autoClose={false}
            toastClassName="custom-toast"
          />
          <ErrorToast />
          <Suspense fallback={<div>Loading...</div>}>
            <AppWrapper>
              <Routes>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/applications" element={<ApplicationListPage />} />
                <Route path="/application" element={<ApplicationEditPage />} />
              </Routes>
            </AppWrapper>
          </Suspense>
        </>
      </Router>
    </I18nextProvider>
  );
}

export default App;
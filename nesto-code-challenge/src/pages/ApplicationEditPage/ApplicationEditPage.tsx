import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationForm } from '../../components/ApplicationForm/ApplicationForm';
import type { MinBestRateByType } from '../../types';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useSelector } from 'react-redux';
import {
  selectApplication,
  selectIsAppLoading,
} from '../../app/store/selectors/applicationsSelectors';
import { selectMinBestRateByType, selectSelectedProductType } from '../../app/store/selectors/productsSelectors';
import Spinner from '../../components/Spinner/Spinner';
import { Centered } from '../../styles/styled-components';
import { ApplicationEditPageWrapper, ApplicationWrapper, ProductWrapper } from './styles/ApplicationEditPage.styles';
import { useTranslation } from 'react-i18next';
import { SPINNER_SIZE_SMALL } from '../../constants/constants';

export const ApplicationEditPage: FC = () => {

  const { t } = useTranslation();

  const { singleAppLoading } = useSelector(selectIsAppLoading);
  const { created, selected } = useSelector(selectApplication);
  const minBestRates: MinBestRateByType = useSelector(selectMinBestRateByType);
  const selectedProductType = useSelector(selectSelectedProductType);

  const setSelectedProduct = minBestRates[selectedProductType as 'FIXED' | 'VARIABLE'];
  const invalidState = !created && !selected;

  if (!singleAppLoading && invalidState) {
    return (
      <Centered>
        <p data-testid="no-application-selected">
          {t('noApplicationSelected')} {t('pleaseGoBackTo')}{' '}
          <Link to="/products">
            {t('products')}
          </Link>{' '}{t('andSelectProductToCreate')}
        </p>
      </Centered>
    )
  }

  return (
    <>
      <ApplicationEditPageWrapper>
        {
          singleAppLoading ?
            <Spinner size={SPINNER_SIZE_SMALL} /> :
            <>
              {setSelectedProduct &&
                <ProductWrapper >
                  <ProductCard product={setSelectedProduct} selectable={false} />
                </ProductWrapper>
              }
              <ApplicationWrapper>
                <ApplicationForm />
              </ApplicationWrapper>
            </>
        }
      </ApplicationEditPageWrapper>
    </>
  );
};

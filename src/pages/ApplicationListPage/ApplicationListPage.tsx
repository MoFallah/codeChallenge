import { useEffect, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { clearCreatedAndSelectedApp, fetchApplications } from '../../app/store/slices/applicationsSlice';
import { ApplicationsGrid } from './components/ApplicationGrid';
import { selectIsAppLoading, selectValidApplications } from '../../app/store/selectors/applicationsSelectors';
import Spinner from '../../components/Spinner/Spinner';
import { ApplicationForm } from '../../components/ApplicationForm/ApplicationForm';
import { FormWrapper, ListWrapper, Page } from './styles/ApplicationListPage.styles';
import { fetchProducts } from '../../app/store/slices/productsSlice';
import type { Application } from '../../types';
import { Centered } from '../../styles/styled-components';
import { useTranslation } from 'react-i18next';
import { SPINNER_SIZE_LARGE } from '../../constants/constants';


export const ApplicationListPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const applications: Application[] = useSelector(selectValidApplications);
  const { allAppsLoading } = useSelector(selectIsAppLoading);

  useEffect(() => {
    dispatch(clearCreatedAndSelectedApp());
    dispatch(fetchApplications());
    dispatch(fetchProducts());
  }, [dispatch]);

  if (allAppsLoading) {
    return <Spinner size={SPINNER_SIZE_LARGE} />;
  }

  if (applications.length === 0) {
    return (
      <Centered>
        <p data-testid="no-applications">{t('noApplications')}</p>
      </Centered>
    );
  }

  return (
    <>
      <Page>
        <ListWrapper>
          <ApplicationsGrid />
        </ListWrapper>
        <FormWrapper>
          <ApplicationForm />
        </FormWrapper>
      </Page>
    </>
  );
};

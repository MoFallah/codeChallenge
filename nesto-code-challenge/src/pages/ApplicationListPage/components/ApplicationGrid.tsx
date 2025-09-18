import { useMemo, type FC } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, ModuleRegistry } from 'ag-grid-community';
import { useDispatch, useSelector } from 'react-redux';
import type { Application } from '../../../types';
import type { AppDispatch } from '../../../app/store';
import { fetchApplicationById } from '../../../app/store/slices/applicationsSlice';
import type { ColDef } from 'ag-grid-community';
import { selectValidApplications } from '../../../app/store/selectors/applicationsSelectors';
import { ActionSpan, GridWrapper } from '../styles/ApplicationGrid.styles';
import { selectProducts } from '../../../app/store/selectors/productsSelectors';
import { useTranslation } from 'react-i18next';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const ApplicationsGrid: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const applications: Application[] = useSelector(selectValidApplications);
  const products = useSelector(selectProducts);

  const getProductName = (id: number) => products.find(product => product.id === id)?.name || '';

  const handleAppClick = async (id: string) => {
    dispatch(fetchApplicationById(id));
  };

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: t('firstName'),
        valueGetter: (params: any) => params.data.applicants[0]?.firstName,
        width: 150,
      },
      {
        headerName: t('lastName'),
        valueGetter: (params: any) => params.data.applicants[0]?.lastName,
        width: 150,
      },
      {
        headerName: t('email'),
        valueGetter: (params: any) => params.data.applicants[0]?.email,
      },
      {
        headerName: t('product'),
        valueGetter: (params: any) => getProductName(params.data.productId),
        width: 250,
      },
      {
        headerName: t('createdAt'),
        field: 'createdAt',
        valueFormatter: (params: any) =>
          new Date(params.value).toLocaleDateString(),
        width: 150,
      },
      {
        headerName: t('details'),
        field: 'id',
        width: 150,
        cellRenderer: (params: any) => (
          <ActionSpan
            onClick={() => handleAppClick(params.value)}
            data-testid={`app-link-${params.value}`}
          >{t('view')}
          </ActionSpan>
        ),
      },
    ],
    [t, handleAppClick]
  );

  return (
    <GridWrapper>
      <AgGridReact
        rowData={applications}
        columnDefs={columnDefs}
        suppressCellFocus
        getRowId={params => params.data.id}
      />
    </GridWrapper>
  );
};
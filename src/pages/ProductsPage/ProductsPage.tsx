import { useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MinBestRateByType, Product } from '../../types';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { fetchProducts, setSelectedProductType } from '../../app/store/slices/productsSlice';
import { clearCreatedAndSelectedApp, createNewApplication } from '../../app/store/slices/applicationsSlice';
import Spinner from '../../components/Spinner/Spinner';
import {
  selectIsAppLoading,
} from '../../app/store/selectors/applicationsSelectors';
import { selectIsProductsLoading, selectMinBestRateByType } from '../../app/store/selectors/productsSelectors';
import { ProductCardWrapper, ProductsPageWrapper } from './styles/ProductsPage.styles';
import { SPINNER_SIZE_LARGE } from '../../constants/constants';

export const ProductsPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isProductLoading = useSelector(selectIsProductsLoading);
  const {singleAppLoading} = useSelector(selectIsAppLoading);
  const minBestRates: MinBestRateByType = useSelector(selectMinBestRateByType);

  const isLoading = isProductLoading || singleAppLoading;

  useEffect(() => {
    dispatch(clearCreatedAndSelectedApp());
    dispatch(setSelectedProductType(''));
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSelect = async (product: Product) => {
    dispatch(setSelectedProductType(product.type));
    await dispatch(createNewApplication(product.id));
    navigate(`/application`);
  };

  return (
    <ProductsPageWrapper>
      {isLoading && <Spinner size={SPINNER_SIZE_LARGE} />}
      {!isLoading && <>
        <ProductCardWrapper>
          {minBestRates.VARIABLE && <ProductCard key={minBestRates.VARIABLE.id} product={minBestRates.VARIABLE} onSelect={handleSelect} />}
        </ProductCardWrapper>
        <ProductCardWrapper>
          {minBestRates.FIXED && <ProductCard key={minBestRates.FIXED.id} product={minBestRates.FIXED} onSelect={handleSelect} />}
        </ProductCardWrapper>
      </>
      }
    </ProductsPageWrapper>
  );
};

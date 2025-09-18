import { type FC } from 'react';
import type { Product } from '../../types';
import { ProductName, ProductRate, ProductType, StyledProductCard } from './ProductCard.styles';
import { Button } from '../StyledButton/StyledButton';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  selectable?: boolean;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onSelect, selectable = true }) => {
  const { t } = useTranslation();

  return (
    <StyledProductCard $selectable={selectable} data-testid={`card-${product.id}`}>
      <ProductType>{t('bestRate')} {t(`type.${product.type.toLowerCase()}`)}</ProductType>
      <ProductName>{product.name}</ProductName>
      <ProductRate>{product.bestRate}%</ProductRate>
      {
        selectable &&
        <Button onClick={() => onSelect?.(product)} disabled={!selectable}>
          {t('select')}
        </Button>
      }
    </StyledProductCard>
  );
};

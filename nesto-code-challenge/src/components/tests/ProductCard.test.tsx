import { fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'; // adjust path to your i18n config
import { ProductCard } from '../ProductCard/ProductCard';
import type { Product } from '../../types';

const product = {
  id: '1',
  name: 'Test Product',
  type: 'FIXED',
  bestRate: 3.5,
} as unknown as Product;

describe('ProductCard unit tests', () => {

  it('renders product name, type, and rate', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ProductCard product={product} />
      </I18nextProvider>
    );

    expect(screen.getByText('Best Fixed')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('3.5%')).toBeInTheDocument();
  });

  it('renders select button when selectable', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ProductCard product={product} selectable={true} />
      </I18nextProvider>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Select this product')).toBeInTheDocument();
  });

  it('does not render select button when not selectable', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ProductCard product={product} selectable={false} />
      </I18nextProvider>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls onSelect with product when button is clicked', () => {
    const onSelect = vi.fn();

    render(<ProductCard product={product} onSelect={onSelect} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(product);
  });

  it('button is disabled when selectable is false', () => {
    render(<ProductCard product={product} selectable={false} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('ProductCard exception tests', () => {
  it('renders with selectable undefined (defaults to true)', () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
import { ProductCard } from "../components/ProductCard/ProductCard";
import type { Product } from "../types";

const sampleProduct = {
  id: 1,
  name: 'Nesto Fixed 5yr',
  type: 'FIXED',
  bestRate: 4.99,
};

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
  argTypes: {
    selectable: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    product: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
};

export const Default = (args) => (
  <div style={{ width: 420, margin: '2rem auto' }}>
    <ProductCard selectable={args.selectable} product={sampleProduct as unknown as Product} />
  </div>
);
Default.args = {
  selectable: true,
};

export const NotSelectable = (args) => (
  <div style={{ width: 420, margin: '2rem auto' }}>
    <ProductCard selectable={args.selectable} product={sampleProduct as unknown as Product} />
  </div>
);
NotSelectable.args = {
  selectable: false,
};
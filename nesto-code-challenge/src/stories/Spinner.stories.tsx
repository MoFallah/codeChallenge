import Spinner from '../components/Spinner/Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: { type: 'number' },
      defaultValue: 50,
    },
    color: {
      control: { type: 'color' },
      defaultValue: '#007bff',
    },
  },
};

export const Default = (args) => <Spinner {...args} />;

Default.args = {
  size: 40,
  color: '#007bff',
};

export const SmallBlue = (args) => <Spinner {...args} />;
SmallBlue.args = {
  size: 20,
  color: '#007bff',
};

export const LargeRed = (args) => <Spinner {...args} />;
LargeRed.args = {
  size: 80,
  color: '#ff0000',
};

export const Green = (args) => <Spinner {...args} />;
Green.args = {
  size: 50,
  color: '#00ff00',
};
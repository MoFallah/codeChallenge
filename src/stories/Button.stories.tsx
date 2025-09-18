import { Button } from '../components/StyledButton/StyledButton';

export default {
  title: 'Components/Button',
  component: Button,
    argTypes: {
    disabled: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
    children: { table: { disable: true } },
    onClick: { table: { disable: true } },
    type: { table: { disable: true } },
  },
};

export const Default = (args) => (
    <div style={{ width: 200, margin: '2rem auto' }}>
      <Button disabled={args.disabled}>Click Me</Button>
    </div>
)

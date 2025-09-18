import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../StyledButton/StyledButton';

describe('Button unit tests', () => {
  it('renders children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies default type', () => {
    render(<Button>Default</Button>);
  
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('applies custom type', () => {
    render(<Button type="submit">Submit</Button>);
  
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('type', 'submit');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
  
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
  
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveStyle('opacity: 0.6');
    expect(btn).toHaveStyle('cursor: not-allowed');
  });
});

describe('Button exception tests', () => {
  it('does not throw if no props are provided except children', () => {
    expect(() => render(<Button>Test</Button>)).not.toThrow();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();

    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
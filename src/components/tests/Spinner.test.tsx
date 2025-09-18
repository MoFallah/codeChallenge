import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner/Spinner';
import { SPINNER_SIZE_LARGE } from '../../constants/constants';

describe('Spinner unit tests', () => {
  it('renders without crashing', () => {
    render(<Spinner />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies default size and color', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveStyle('width: 40px');
    expect(spinner).toHaveStyle('border-top: 5px solid #007bff');
  });

  it('applies custom size and color', () => {
    render(<Spinner size={SPINNER_SIZE_LARGE} color="#123456" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveStyle('width: 60px');
    expect(spinner).toHaveStyle('border-top: 7.5px solid #123456');
  });
});

describe('Spinner exception tests', () => {
  it('does not throw if no props are provided', () => {
    expect(() => render(<Spinner />)).not.toThrow();
  });

  it('handles invalid color gracefully', () => {
    expect(() => render(<Spinner color="invalid-color" />)).not.toThrow();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
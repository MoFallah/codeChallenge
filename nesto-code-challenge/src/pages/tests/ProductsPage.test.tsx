import { render, screen } from '@testing-library/react';
import { ProductsPage } from '../ProductsPage/ProductsPage';

let mockState: any = {};
const mockNavigate = vi.fn();

vi.mock('react-redux', () => ({
  useSelector: (selector: any) => selector(mockState),
  useDispatch: () => vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('ProductsPage unit tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState = {
      products: {
        items: [],
        loading: false,
        selectedProductType: '',
      },
      applications: {
        items: [],
        selected: null,
        created: null,
        allAppsLoading: false,
        singleAppLoading: false,
      },
    };
  });

  it('Should show Spinner when products loading is true', () => {
    mockState.products.loading = true;
    render(<ProductsPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('Should show Spinner when single application loading is true', () => {
    mockState.products.loading = false;
    mockState.applications.singleAppLoading = true;
    render(<ProductsPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('Should render ProductCard for VARIABLE and FIXED min best rates when not loading', () => {
    mockState.products.items = [
      { id: 'abc123', name: 'MCAP Value-Flex Variable Special', type: 'VARIABLE', bestRate: 1.2 },
      { id: 'abc124', name: 'Standard', type: 'FIXED', bestRate: 2.0 },
      { id: 'abc125', name: 'MCAP Value-Flex Fixed Special', type: 'FIXED', bestRate: 2.5 }
    ];
    render(<ProductsPage />);
    expect(screen.getByTestId('card-abc123')).toBeInTheDocument();
    expect(screen.getByTestId('card-abc124')).toBeInTheDocument();
  });
});


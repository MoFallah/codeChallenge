import { render, screen } from '@testing-library/react';
import { ApplicationsGrid } from '../ApplicationListPage/components/ApplicationGrid';

let mockState: any;

vi.mock('react-redux', () => ({
  useSelector: (selector: any) => selector(mockState),
  useDispatch: () => vi.fn(),
}));

vi.mock('ag-grid-react', async () => {
  return {
    AgGridReact: ({ rowData = [] }: any) => (
      <div data-testid="ag-grid-mock">
        {rowData.map((r: any) => (
          <div key={r.id} data-testid={`row-${r.id}`}>
            {r.applicants?.[0]?.firstName}
          </div>
        ))}
      </div>
    ),
  };
});

describe('ApplicationGrid unit tests', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    mockState = {
      applications: {
        allAppsLoading: false,
        singleAppLoading: false,
        items: [
          { id: 'abc123', applicants: [{ firstName: 'Moe', lastName: 'Tafti', email: 'M.T@gmail.com', phone: '5145858440' }] },
        ],
        selected: null,
        created: null,
      },
      products: {
        items: [{ id: 'abc123', name: 'Product Fix' }, { id: 'abc124', name: 'Product Variable' }],
        loading: false,
        selectedProductType: '',
      },
    };
  });

  it('should show the grid', () => {
    render(<ApplicationsGrid />);
    const gridRows = screen.getByText('Moe');
    expect(gridRows).toBeInTheDocument();
  });

});
import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ApplicationListPage } from '../ApplicationListPage/ApplicationListPage';

let mockState: any;

vi.mock('react-redux', () => ({
    useSelector: (selector: any) => selector(mockState),
    useDispatch: () => vi.fn(),
}));

vi.mock('../ApplicationListPage/components/ApplicationGrid', () => ({
    ApplicationsGrid: () => <div data-testid="applications-grid" />,
}));
vi.mock('../../components/ApplicationForm/ApplicationForm', () => ({
    ApplicationForm: () => <div data-testid="application-form" />,
}));

describe('ApplicationListPage', () => {

    beforeEach(() => {
        vi.clearAllMocks();
        mockState = {
            applications: {
                allAppsLoading: false,
                singleAppLoading: false,
                items: [],
                selected: null,
                created: null,
            },
            products: {
                items: [],
                loading: false,
                selectedProductType: '',
            },
        };
    });

    it('Should show Spinner when allAppsLoading is true', () => {
        mockState.applications.allAppsLoading = true;
        render(<ApplicationListPage />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('Should not render ApplicationsGrid and ApplicationForm when there are no applications', () => {
        mockState.applications.allAppsLoading = false;
        render(<ApplicationListPage />);
        expect(screen.queryByTestId('applications-grid')).not.toBeInTheDocument();
        expect(screen.queryByTestId('application-form')).not.toBeInTheDocument();
        expect(screen.getByTestId('no-applications')).toBeInTheDocument();
    });


    it('Should render ApplicationsGrid and ApplicationForm when there are no applications', () => {
        mockState.applications.allAppsLoading = false;
        mockState.applications.items = [
            { id: 'abc123', applicants: [{ firstName: 'Moe', lastName: 'Tafti', email: 'M.T@gmail.com' ,phone: '5145858440' }] },
        ];
        render(<ApplicationListPage />);
        expect(screen.queryByTestId('applications-grid')).toBeInTheDocument();
        expect(screen.queryByTestId('application-form')).toBeInTheDocument();
    });
});
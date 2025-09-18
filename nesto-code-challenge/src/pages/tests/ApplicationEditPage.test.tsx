import { describe, it, beforeEach, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ApplicationEditPage } from '../ApplicationEditPage/ApplicationEditPage';
let mockState: any = {};

vi.mock('react-redux', () => ({
    useSelector: (selector: any) => selector(mockState),
}));

vi.mock('react-router-dom', () => ({
    Link: ({ children, to, className }: any) => <a href={to} className={className}>{children}</a>,
}));

vi.mock('../../components/ApplicationForm/ApplicationForm', () => ({
    ApplicationForm: () => <div data-testid="application-form" />,
}));

describe('ApplicationEditPage unit tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockState = {
            applications: {
                created: null,
                selected: null,
                singleAppLoading: false,
            },
            products: {
                items: [],
                selectedProductType: '',
            },
        };
    });
    it('Should show "No application selected" message when not loading and no created/selected', () => {
        mockState.applications.singleAppLoading = false;
        mockState.applications.created = null;
        mockState.applications.selected = null;

        render(<ApplicationEditPage />);

        expect(screen.getByTestId('no-application-selected')).toBeInTheDocument();
    });

    it('Should show Spinner when singleAppLoading is true', () => {
        mockState.applications.singleAppLoading = true;

        render(<ApplicationEditPage />);

        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('Should render ProductCard and ApplicationForm when a selected product is available and not loading', () => {
        mockState.applications.singleAppLoading = false;
        mockState.applications.selected = { id: 'app-id' };

        mockState.products.selectedProductType = 'VARIABLE';
        mockState.products.items = [
            { id: 'abc1234', name: 'Variable Best', type: 'VARIABLE', bestRate: 1.2 },
            { id: 'abc4567', name: 'Fixed Best', type: 'FIXED', bestRate: 2.0 },
        ];

        render(<ApplicationEditPage />);

        expect(screen.getByTestId('card-abc1234')).toBeInTheDocument();
        expect(screen.getByTestId('application-form')).toBeInTheDocument();
    });
});
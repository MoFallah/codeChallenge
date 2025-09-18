import { render, screen } from '@testing-library/react';
import { ApplicationForm } from '../ApplicationForm/ApplicationForm';
import i18n from '../../i18n';
import { I18nextProvider } from 'react-i18next';

let mockState: any = {};
const mockNavigate = vi.fn();

vi.mock('react-redux', () => ({
  useSelector: (selector: any) => selector(mockState),
  useDispatch: () => vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('ProductsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockState = {
      applications: {
        items: [],
        selected: null,
        created: null,
        allAppsLoading: false,
        singleAppLoading: true,
      },
    };
  });

  it('Should show Spinner when an Application is being loaded', () => {
    render(<ApplicationForm />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('Should NOT show Spinner when an Application is not being loaded', () => {
    mockState.applications.singleAppLoading = false;

    render(<ApplicationForm />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('Should show "Click on view details to edit an application" message when an Application is not being loaded', () => {
    mockState.applications.singleAppLoading = false;

    render(<ApplicationForm />);

    expect(screen.getByTestId('select-application')).toBeInTheDocument();
  });

  it('Should show 4 input fields and a button in save mode', () => {
    mockState.applications.singleAppLoading = false;
    mockState.applications.created = {
      id: 'abc1234',
      applicants: [],
    };

    render(
      <I18nextProvider i18n={i18n}>
        <ApplicationForm />
      </I18nextProvider>
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/first Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/phone/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Should show 4 prepopulated fields and a button in edit mode', () => {
    mockState.applications.singleAppLoading = false;
    mockState.applications.created = null;
    mockState.applications.selected = {
      id: 'abc1234',
      applicants: [
        { firstName: 'Moe', lastName: 'Tafti', email: 'moe@gmail.com', phone: '5145858440' },
      ],
    };

    render(<ApplicationForm />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Moe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Tafti')).toBeInTheDocument();
    expect(screen.getByDisplayValue('moe@gmail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5145858440')).toBeInTheDocument();
  });

  it('Should show "Update applicant info" as button title in edit mode', () => {
    mockState.applications.singleAppLoading = false;
    mockState.applications.created = null;
    mockState.applications.selected = {
      id: 'abc1234',
      applicants: [
        { firstName: 'Moe', lastName: 'Tafti', email: 'moe@gmail.com', phone: '5145858440' },
      ],
    };

    render(
      <I18nextProvider i18n={i18n}>
        <ApplicationForm />
      </I18nextProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent(/Update applicant info/i);
  });

  it('Should show "Save applicant info" as button title in edit save', () => {
    mockState.applications.singleAppLoading = false;
    mockState.applications.selected = null;
    mockState.applications.created = {
      id: 'abc1234',
      applicants: [],
    };

    render(
      <I18nextProvider i18n={i18n}>
        <ApplicationForm />
      </I18nextProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent(/Save applicant info/i);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

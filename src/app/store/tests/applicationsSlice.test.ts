import applicationsReducer, {
  clearCreatedAndSelectedApp,
  updateApplications,
  fetchApplications,
  fetchApplicationById,
  createNewApplication,
} from './../slices/applicationsSlice';
import type { Application, Applicant } from '../../../types';

const validApplicant: Applicant = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  phone: '1234567890',
};

const updatedApplicant: Applicant = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@smith.com',
  phone: '0987654321',
};

const application: Application = {
  id: 'app-1',
  token: 'token-1',
  type: 'NEW',
  applicants: [validApplicant],
  createdAt: '2024-01-01T00:00:00Z',
};

const initialState = {
  items: [],
  selected: null,
  created: null,
  allAppsLoading: false,
  singleAppLoading: false,
};

describe('unit', () => {
  it('returns initial state', () => {
    expect(applicationsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('clearCreatedAndSelectedApp sets created and selected to null', () => {
    const state = {
      ...initialState,
      created: application,
      selected: application,
    };
    const result = applicationsReducer(state, clearCreatedAndSelectedApp());
    expect(result.created).toBeNull();
    expect(result.selected).toBeNull();
  });

  it('updateApplications updates selected applicant', () => {
    const state = {
      ...initialState,
      items: [application],
      selected: application,
    };
    const result = applicationsReducer(state, updateApplications(updatedApplicant));
    expect(result.items[0].applicants[0]).toEqual(updatedApplicant);
  });

  it('updateApplications does nothing if selected is null', () => {
    const state = {
      ...initialState,
      items: [application],
      selected: null,
    };
    const result = applicationsReducer(state, updateApplications(updatedApplicant));
    expect(result.items[0].applicants[0]).toEqual(validApplicant);
  });
});

describe('acceptance', () => {
  it('sets allAppsLoading true on fetchApplications.pending', () => {
    const action = { type: fetchApplications.pending.type };
    const state = applicationsReducer(initialState, action);
    expect(state.allAppsLoading).toBe(true);
  });

  it('sets items and allAppsLoading false on fetchApplications.fulfilled', () => {
    const action = { type: fetchApplications.fulfilled.type, payload: [application] };
    const state = applicationsReducer({ ...initialState, allAppsLoading: true }, action);
    expect(state.allAppsLoading).toBe(false);
    expect(state.items).toEqual([application]);
  });

  it('sets singleAppLoading true on createNewApplication.pending', () => {
    const action = { type: createNewApplication.pending.type };
    const state = applicationsReducer(initialState, action);
    expect(state.singleAppLoading).toBe(true);
  });

  it('sets created and singleAppLoading false on createNewApplication.fulfilled', () => {
    const action = { type: createNewApplication.fulfilled.type, payload: application };
    const state = applicationsReducer({ ...initialState, singleAppLoading: true }, action);
    expect(state.singleAppLoading).toBe(false);
    expect(state.created).toEqual(application);
  });

  it('sets singleAppLoading true on fetchApplicationById.pending', () => {
    const action = { type: fetchApplicationById.pending.type };
    const state = applicationsReducer(initialState, action);
    expect(state.singleAppLoading).toBe(true);
  });

  it('sets selected and singleAppLoading false on fetchApplicationById.fulfilled', () => {
    const action = { type: fetchApplicationById.fulfilled.type, payload: application };
    const state = applicationsReducer({ ...initialState, singleAppLoading: true }, action);
    expect(state.singleAppLoading).toBe(false);
    expect(state.selected).toEqual(application);
  });
});

describe('exception', () => {
  it('updateApplications does nothing if selected id not found in items', () => {
    const state = {
      ...initialState,
      items: [application],
      selected: { ...application, id: 'not-found' },
    };
    const result = applicationsReducer(state, updateApplications(updatedApplicant));
    expect(result.items[0].applicants[0]).toEqual(validApplicant);
  });

  it('does not change state on unknown action', () => {
    const state = { ...initialState, items: [application] };
    const result = applicationsReducer(state, { type: 'unknown_action' });
    expect(result).toEqual(state);
  });
});
import type { RootState } from '..';
import {
  selectApplication,
  selectIsAppLoading,
  selectValidApplications,
  selectStatusAndApplication,
} from '../selectors/applicationsSelectors';

const validApplicant = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@doe.com',
  phone: '1234567890',
};

const invalidApplicant = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const validApplication = {
  id: '1',
  token: 'abc',
  type: 'NEW',
  applicants: [validApplicant],
  createdAt: '2024-01-01T00:00:00Z',
};

const invalidApplication = {
  id: '2',
  token: 'def',
  type: 'NEW',
  applicants: [invalidApplicant],
  createdAt: '2024-01-02T00:00:00Z',
};

describe('unit', () => {
  it('selectApplication returns created and selected', () => {
    const state = {
      applications: {
        created: validApplication,
        selected: invalidApplication,
      },
    } as unknown as RootState;
    expect(selectApplication(state)).toEqual({
      created: validApplication,
      selected: invalidApplication,
    });
  });

  it('selectIsAppLoading returns loading flags', () => {
    const state = {
      applications: {
        singleAppLoading: true,
        allAppsLoading: false,
      },
    } as unknown as RootState;
    expect(selectIsAppLoading(state)).toEqual({
      singleAppLoading: true,
      allAppsLoading: false,
    });
  });

  it('selectValidApplications filters only valid applications', () => {
    const state = {
      applications: {
        items: [validApplication, invalidApplication],
      },
    } as unknown as RootState;
    expect(selectValidApplications(state)).toEqual([validApplication]);
  });

  it('selectStatusAndApplication returns correct status and application (created exists)', () => {
    const state = {
      applications: {
        created: validApplication,
        selected: invalidApplication,
      },
    } as unknown as RootState;
    expect(selectStatusAndApplication(state)).toEqual({
      status: 'save',
      application: validApplication,
    });
  });

  it('selectStatusAndApplication returns correct status and application (created null)', () => {
    const state = {
      applications: {
        created: null,
        selected: validApplication,
      },
    } as unknown as RootState;
    expect(selectStatusAndApplication(state)).toEqual({
      status: 'update',
      application: validApplication,
    });
  });
});

describe('acceptance', () => {
  it.skip('selectValidApplications returns empty array if no valid applications', () => {
    const state = {
      applications: {
        items: [invalidApplication],
      },
    } as unknown as RootState;
    expect(selectValidApplications(state)).toEqual([]);
  });

  it('selectIsAppLoading works with both flags true', () => {
    const state = {
      applications: {
        singleAppLoading: true,
        allAppsLoading: true,
      },
    } as unknown as RootState;
    expect(selectIsAppLoading(state)).toEqual({
      singleAppLoading: true,
      allAppsLoading: true,
    });
  });
});

describe('exception', () => {
  it.skip('selectValidApplications returns empty array if items is undefined', () => {
    const state = {
      applications: {
        items: undefined,
      },
    } as unknown as RootState;
    expect(selectValidApplications(state)).toEqual([]);
  });


  it('selectValidApplications returns empty array if items is empty', () => {
    const state = {
      applications: {
        items: [],
      },
    } as unknown as RootState;
    expect(selectValidApplications(state)).toEqual([]);
  });

  it('selectStatusAndApplication returns update/null if both created and selected are null', () => {
    const state = {
      applications: {
        created: null,
        selected: null,
      },
    } as unknown as RootState;
    expect(selectStatusAndApplication(state)).toEqual({
      status: 'update',
      application: null,
    });
  });
});
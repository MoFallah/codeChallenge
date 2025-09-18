import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Application, PartialApplication, ApiError, Applicant } from '../../../types';
import { getApplications, getApplicationById, createApplication, updateApplication } from '../../../api/apis';

export interface ApplicationsState {
  items: Application[];
  selected: Application | null;
  created: Application | null;
  allAppsLoading: boolean;
  singleAppLoading: boolean;
}

const initialState: ApplicationsState = {
  items: [],
  selected: null,
  created: null,
  allAppsLoading: false,
  singleAppLoading: false,
};

export const fetchApplications = createAsyncThunk<Application[], void, { rejectValue: string }>(
  'applications/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      return await getApplications();
    } catch (err) {
      const error = err as ApiError;
      return rejectWithValue(error.message || 'Failed to fetch applications');
    }
  }
);

export const fetchApplicationById = createAsyncThunk<Application, string, { rejectValue: string }>(
  'applications/fetchApplicationById',
  async (id, { rejectWithValue }) => {
    try {
      return await getApplicationById(id);
    } catch (err) {
      const error = err as ApiError;
      return rejectWithValue(error.message || 'Failed to fetch application');
    }
  }
);

export const createNewApplication = createAsyncThunk(
  'applications/createNewApplication',
  async (productId: number, { rejectWithValue }) => {
    try {
      return await createApplication({ productId });
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const updateApplicationById = createAsyncThunk<Application, { id: string; body: PartialApplication }, { rejectValue: string }>(
  'applications/updateApplicationById',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await updateApplication(id, body);
    } catch (err) {
      const error = err as ApiError;
      return rejectWithValue(error.message || 'Failed to update application');
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearCreatedAndSelectedApp: (state) => {
      state.created = null;
      state.selected = null;
    },
    updateApplications: (state, action: PayloadAction<Applicant>) => {
      const selectedId = state.selected?.id;
      if (!selectedId) return;

      const index = state.items.findIndex(app => app.id === selectedId);
      if (index !== -1) {
        state.items[index].applicants[0] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.allAppsLoading = true;
      })
      .addCase(fetchApplications.fulfilled, (state, action: PayloadAction<Application[]>) => {
        state.allAppsLoading = false;
        state.items = action.payload;
      })

      .addCase(createNewApplication.pending, state => {
        state.singleAppLoading = true;
      })
      .addCase(createNewApplication.fulfilled, (state, action) => {
        state.created = action.payload;
        state.singleAppLoading = false;
      })

      .addCase(fetchApplicationById.pending, state => {
        state.singleAppLoading = true;
      })
      .addCase(fetchApplicationById.fulfilled, (state, action) => {
        state.singleAppLoading = false;
        state.selected = action.payload;
      })
  },
});

export const {
  clearCreatedAndSelectedApp,
  updateApplications
} = applicationsSlice.actions;
export default applicationsSlice.reducer;

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { Application } from "../../../types";
import { isValidApplication } from "../../../utils/utils";

const selectApplications = (state: RootState) => state.applications.items;
export const selectApplication = createSelector(
  [
    (state: RootState) => state.applications.created,
    (state: RootState) => state.applications.selected,
  ],
  (created, selected) => ({ created, selected })
);
export const selectIsAppLoading = createSelector(
  [
    (state: RootState) => state.applications.singleAppLoading,
    (state: RootState) => state.applications.allAppsLoading,
  ],
  (singleAppLoading, allAppsLoading) => ({
    singleAppLoading,
    allAppsLoading,
  })
);

export const selectValidApplications = createSelector(
  [selectApplications],
  (applications: Application[]) =>
    applications.filter((app) => isValidApplication(app.applicants[0]))
);

export const selectStatusAndApplication = createSelector(
  [(state: RootState) => state.applications.created, (state: RootState) => state.applications.selected],
  (created, selected) => ({
    status: created ? 'save' : 'update',
    application: created == null ? selected : created,
  })
);
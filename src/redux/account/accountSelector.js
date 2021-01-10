import {createSelector} from "reselect";

export const selectAccountUser = createSelector(
    state => state.account.user,
    user => user
)
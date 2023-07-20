import {StateSchema} from "app/providers/StoreProvider";
import {createSelector} from "@reduxjs/toolkit";

import {UserRole} from "../consts/consts";

export const getUserRole = (state: StateSchema) => state.user.authData?.role;

export const isUserAdmin = createSelector(
    getUserRole,
    (role) => Boolean(role?.includes(UserRole.ADMIN))
)

export const isUserManager = createSelector(
    getUserRole,
    (role) => Boolean(role?.includes(UserRole.MANAGER))
)

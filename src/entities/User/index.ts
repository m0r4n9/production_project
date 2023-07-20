export {userReducer, userActions} from './model/slice/userSlice';
export {UserSchema, User, UserRole} from './model/types/user';
export {getUserAuthData} from './model/selectors/getUserAuthData/getUserAuthData';
export {getUserInited} from './model/selectors/getUserInited/getUserInited';
export {
    getUserRole,
    isUserAdmin,
    isUserManager,
} from './model/selectors/roleSelectors';

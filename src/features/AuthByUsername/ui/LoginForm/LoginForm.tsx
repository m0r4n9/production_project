import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './LoginForm.module.scss';
import {useTranslation} from "react-i18next";
import {Button, ThemeButton} from "@/shared/ui/Button";
import {Input} from "@/shared/ui/Input";
import {useSelector} from "react-redux";
import React, {memo, useCallback} from "react";
import {loginActions, loginReducer} from "../../model/slice/loginSlice";
import {loginByUsername} from "../../model/services/loginByUsername/loginByUsername";
import {Text, TextTheme} from "@/shared/ui/Text";
import {getLoginUsername} from "../../model/selectors/getLoginUsername/getLoginUsername";
import {getLoginPassword} from "../../model/selectors/getLoginPassword/getLoginPassword";
import {getLoginIsLoading} from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import {getLoginError} from "../../model/selectors/getLoginError/getLoginError";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";


export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

// Если передавать таким образом, то dynamic module loader будет ссылаться по одной ссылке и не переделывать ее
const initialReducers: ReducersList = {
    loginForm: loginReducer
}

const LoginForm = memo(({className, onSuccess}: LoginFormProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({username, password}));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, username, password])

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={true}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')}/>
                {error && <Text text={error} theme={TextTheme.ERROR}/>}
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите username')}
                    autoFocus={true}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите пароль')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    theme={ThemeButton.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>

    );
});

export default LoginForm;

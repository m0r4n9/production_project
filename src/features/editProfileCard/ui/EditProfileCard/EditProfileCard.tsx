import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import cls from './EditProfileCard.module.scss';
import {memo, useCallback, useEffect} from 'react';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {Currency} from "@/entities/Currency";
import {Country} from "@/entities/Country";
import {Text, TextTheme} from "@/shared/ui/Text/Text";
import {getProfileForm} from '../../model/selectors/getProfileForm/getProfileForm';
import {getProfileIsLoading} from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import {getProfileError} from "../../model/selectors/getProfileError/getProfileError";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import {
    getProfileValidateErrors
} from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import {ProfileCard} from "@/entities/Profile";
import {fetchProfileData} from "../../model/services/fetchProfileData/fetchProfileData";
import {profileActions, profileReducer} from '../../model/slice/profileSlice';
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { EditProfileCardHeader } from '../EditProfileCardHeader/EditProfileCardHeader';
import {VStack} from "@/shared/ui/Stack/VStack/VStack";
import {ValidateProfileError} from "../../model/consts/consts";

interface EditProfileCardProps {
    className?: string;
    id: string;
}

const reducer: ReducersList = {
    profile: profileReducer
}

export const EditProfileCard = memo((props: EditProfileCardProps) => {
    const {className, id} = props;
    const {t} = useTranslation('profile');
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslate = {
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная регион'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.SERVER_ERROR]: t('Северная ошибка при сохранении')
    }

    useEffect(() => {
        // if (__PROJECT__ !== 'storybook') {
        //     Это нужно для того, чтобы storybook не обращался к серверу с запросами
        // }
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch]);

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({firstname: value || ''}));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        if (!Number(value)) {
            return;
        }
        dispatch(profileActions.updateProfile({age: Number(value || 0)}));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({username: value || ''}));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({avatar: value || ''}));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({currency}));
    }, []);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({country}));
    }, []);

    return (
        <DynamicModuleLoader reducers={reducer}>
            <VStack
                max
                gap='8'
                className={classNames(cls.EditProfileCard, {}, [className])}
            >
                <EditProfileCardHeader/>
                {validateErrors?.length && validateErrors.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslate[err]}
                    />
                ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeAvatar={onChangeAvatar}
                    onChangeUsername={onChangeUsername}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});

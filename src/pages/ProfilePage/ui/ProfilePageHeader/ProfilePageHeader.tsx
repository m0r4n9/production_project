import {classNames} from "shared/lib/classNames/classNames";
import {Text} from "shared/ui/Text/Text";
import {Button, ThemeButton} from "shared/ui/Button/Button";
import {useTranslation} from "react-i18next";
import {getProfileData, getProfileReadonly, profileActions, updateProfileData} from "entities/Profile";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useCallback} from "react";
import {getUserAuthData} from "entities/User";
import {HStack} from "shared/ui/Stack/HStack/HStack";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({className}: ProfilePageHeaderProps) => {
    const {t} = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const canEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch])

    const onCloseEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    return (
        <HStack max justify='between' className={classNames('', {}, [className])}>
            <Text title={t('Профиль')}/>
            {canEdit && (
                <div>
                    {
                        readonly
                            ? (
                                <Button
                                    theme={ThemeButton.OUTLINE}
                                    onClick={onEdit}
                                >
                                    {t('Редактировать')}
                                </Button>
                            )
                            : (
                                <HStack gap='8'>
                                    <Button
                                        theme={ThemeButton.OUTLINE_RED}
                                        onClick={onCloseEdit}
                                    >
                                        {t('Отменить')}
                                    </Button>
                                    <Button
                                        theme={ThemeButton.OUTLINE}
                                        onClick={onSave}
                                    >
                                        {t('Сохранить')}
                                    </Button>
                                </HStack>

                            )
                    }
                </div>
            )}
        </HStack>
    );
};

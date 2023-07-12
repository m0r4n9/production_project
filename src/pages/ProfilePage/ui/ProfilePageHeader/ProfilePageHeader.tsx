import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePageHeader.module.scss';
import {Text} from "shared/ui/Text/Text";
import {Button, ThemeButton} from "shared/ui/Button/Button";
import {useTranslation} from "react-i18next";
import {getProfileReadonly, profileActions, updateProfileData} from "entities/Profile";
import {useSelector} from "react-redux";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useCallback} from "react";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({className}: ProfilePageHeaderProps) => {
    const {t} = useTranslation('profile');
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

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
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')}/>
            {
                readonly
                    ? (
                        <Button
                            theme={ThemeButton.OUTLINE}
                            className={cls.editBtn}
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    )
                    : (
                        <>
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                className={cls.editBtn}
                                onClick={onCloseEdit}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                theme={ThemeButton.OUTLINE}
                                className={cls.saveBtn}
                                onClick={onSave}
                            >
                                {t('Сохранить')}
                            </Button>
                        </>

                    )
            }

        </div>
    );
};
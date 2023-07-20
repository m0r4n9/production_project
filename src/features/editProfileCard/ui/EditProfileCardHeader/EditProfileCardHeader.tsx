import {classNames} from "shared/lib/classNames/classNames";
import {useTranslation} from "react-i18next"
import {memo, useCallback} from 'react';
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {HStack} from "shared/ui/Stack/HStack/HStack";
import {Text} from "shared/ui/Text/Text";
import {Button, ThemeButton} from "shared/ui/Button/Button";
import {getProfileData} from "../../model/selectors/getProfileData/getProfileData";
import {getProfileReadonly} from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { profileActions } from "../../model/slice/profileSlice";
import {updateProfileData} from "../../model/services/updateProfileData/updateProfileData";

interface EditProfileCardHeader {
    className?: string;
}

export const EditProfileCardHeader = memo((props: EditProfileCardHeader) => {
    const {className} = props;
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
});

import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesign/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesign/Text';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesign/Button';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesign/Card';

interface EditProfileCardHeader {
    className?: string;
}

export const EditProfileCardHeader = memo((props: EditProfileCardHeader) => {
    const { className } = props;
    const { t } = useTranslation('profile');
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
    }, [dispatch]);

    const onCloseEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    return (
        <ToggleFeatures
            feature={'isAppRedesign'}
            on={
                <Card border="partial" padding="24" fullWidth>
                    <HStack
                        max
                        justify="between"
                        className={classNames('', {}, [className])}
                    >
                        <Text title={t('Профиль')} />
                        {canEdit && (
                            <div>
                                {readonly ? (
                                    <Button variant="outline" onClick={onEdit}>
                                        {t('Редактировать')}
                                    </Button>
                                ) : (
                                    <HStack gap="8">
                                        <Button
                                            variant="outline"
                                            color='error'
                                            onClick={onCloseEdit}
                                        >
                                            {t('Отменить')}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            color='success'
                                            onClick={onSave}
                                        >
                                            {t('Сохранить')}
                                        </Button>
                                    </HStack>
                                )}
                            </div>
                        )}
                    </HStack>
                </Card>
            }
            off={
                <HStack
                    max
                    justify="between"
                    className={classNames('', {}, [className])}
                >
                    <TextDeprecated title={t('Профиль')} />
                    {canEdit && (
                        <div>
                            {readonly ? (
                                <ButtonDeprecated
                                    theme={ThemeButton.OUTLINE}
                                    onClick={onEdit}
                                >
                                    {t('Редактировать')}
                                </ButtonDeprecated>
                            ) : (
                                <HStack gap="8">
                                    <ButtonDeprecated
                                        theme={ThemeButton.OUTLINE_RED}
                                        onClick={onCloseEdit}
                                    >
                                        {t('Отменить')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        theme={ThemeButton.OUTLINE}
                                        onClick={onSave}
                                    >
                                        {t('Сохранить')}
                                    </ButtonDeprecated>
                                </HStack>
                            )}
                        </div>
                    )}
                </HStack>
            }
        />
    );
});

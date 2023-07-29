import { memo } from 'react';
import { ProfileCardProps } from '@/entities/Profile/ui/ProfileCard/ProfileCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack, VStack } from '@/shared/ui/redesign/Stack';
import { Avatar } from '@/shared/ui/redesign/Avatar';
import { Input } from '@/shared/ui/redesign/Input';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Card } from '@/shared/ui/redesign/Card';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/shared/ui/redesign/Skeleton';
import { Text } from '@/shared/ui/redesign/Text';

export const ProfileCardRedesignSkeleton = () => {
    return (
        <Card fullWidth padding="24">
            <VStack gap={'32'}>
                <HStack max justify={'center'}>
                    <Skeleton border='100%' width={128} height={128}/>
                </HStack>
            </VStack>
            <HStack gap={'32'}>
                <VStack gap={'16'} max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>
                <VStack gap={'16'} max>
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                    <Skeleton width="100%" height={38} />
                </VStack>
            </HStack>
        </Card>
    );
};

export const ProfileCardRedesignError = () => {
    const { t } = useTranslation('profile');

    return (
        <HStack
            justify="center"
            max
        >
            <Text
                variant={'error'}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={'center'}
            />
        </HStack>
    );
};

export const ProfileCardRedesign = memo((props: ProfileCardProps) => {
    const {
        className,
        onChangeCurrency,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCity,
        onChangeLastname,
        onChangeFirstname,
        onChangeAge,
        data,
        readonly,
    } = props;
    const { t } = useTranslation('profile');

    return (
        <Card padding="24" fullWidth className={className}>
            <VStack gap="32">
                {data?.avatar && (
                    <HStack max justify="center">
                        <Avatar size={128} src={data?.avatar} />
                    </HStack>
                )}
            </VStack>

            <HStack gap="24">
                <VStack max gap={'16'}>
                    <Input
                        value={data?.firstname}
                        label={t('Имя')}
                        onChange={onChangeFirstname}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.lastname}
                        label={t('Фамилия')}
                        onChange={onChangeLastname}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.age}
                        label={t('Возраст')}
                        onChange={onChangeAge}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.city}
                        label={t('Город')}
                        onChange={onChangeCity}
                        readonly={readonly}
                    />
                </VStack>
                <VStack max gap="16">
                    <Input
                        value={data?.username}
                        label={t('Имя пользователя')}
                        onChange={onChangeUsername}
                        readonly={readonly}
                    />
                    <Input
                        value={data?.avatar}
                        label={t('Ссылка на аватар')}
                        onChange={onChangeAvatar}
                        readonly={readonly}
                    />
                    <CurrencySelect
                        value={data?.currency}
                        onChange={onChangeCurrency}
                        readonly={readonly}
                    />
                    <CountrySelect
                        value={data?.country}
                        onChange={onChangeCountry}
                        readonly={readonly}
                    />
                </VStack>
            </HStack>
        </Card>
    );
});

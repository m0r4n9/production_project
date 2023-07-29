import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss';
import {useTranslation} from "react-i18next"
import {Text, TextAlign, TextTheme} from '@/shared/ui/deprecated/Text';
import {Input} from "@/shared/ui/deprecated/Input";
import {Profile} from "../../model/types/profile";
import {Loader} from "@/shared/ui/deprecated/Loader";
import {Avatar} from "@/shared/ui/deprecated/Avatar";
import {Currency, CurrencySelect} from "@/entities/Currency";
import {Country, CountrySelect} from "@/entities/Country";
import {VStack} from "@/shared/ui/redesign/Stack";
import {HStack} from "@/shared/ui/redesign/Stack";

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeFirstname?: (value?: string) => void;
    onChangeLastname?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

/**
 * @deprecated
 */
export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry
    } = props;
    const {t} = useTranslation('profile');

    const mods: Mods = {
        [cls.editing]: !readonly,
    }

    if (isLoading) {
        return (
            <HStack
                max
                justify='center'
                className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
            >
                <Loader/>
            </HStack>
        )
    }

    if (error) {
        return (
            <HStack
                justify='center'
                max
                className={classNames(cls.ProfileCard, {}, [className, cls.error])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        )
    }

    return (
        <VStack
            gap='16'
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack
                    max
                    justify='center'
                    className={cls.avatarWrapper}
                >
                    <Avatar src={data?.avatar}/>
                </HStack>
            )}
            <Input
                value={data?.firstname}
                placeholder={t('Ваше имя')}
                className={cls.input}
                onChange={onChangeFirstname}
                readonly={readonly}
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                onChange={onChangeLastname}
                readonly={readonly}
            />
            <Input
                value={data?.age}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                onChange={onChangeAge}
                readonly={readonly}
            />
            <Input
                value={data?.city}
                placeholder={t('Город')}
                className={cls.input}
                onChange={onChangeCity}
                readonly={readonly}
            />
            <Input
                value={data?.username}
                placeholder={t('Имя пользователя')}
                className={cls.input}
                onChange={onChangeUsername}
                readonly={readonly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Введите ссылку на аватар')}
                className={cls.input}
                onChange={onChangeAvatar}
                readonly={readonly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
};

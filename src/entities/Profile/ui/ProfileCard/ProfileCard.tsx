import { useTranslation } from 'react-i18next';
import { Profile } from '../../model/types/profile';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { ToggleFeatures } from '@/shared/lib/features';
import {
    ProfileCardDeprecated,
    ProfileCardDeprecatedError,
    ProfileCardDeprecatedLoader,
} from '../ProfileCardDeprecated/ProfileCardDeprecated';
import {
    ProfileCardRedesign,
    ProfileCardRedesignError,
    ProfileCardRedesignSkeleton,
} from '../ProfileCardRedesign/ProfileCardRedesign';

export interface ProfileCardProps {
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

export const ProfileCard = (props: ProfileCardProps) => {
    const { isLoading, error } = props;
    const { t } = useTranslation('profile');


    if (isLoading) {
        return (
            <ToggleFeatures
                feature="isAppRedesign"
                on={<ProfileCardRedesignSkeleton />}
                off={<ProfileCardDeprecatedLoader />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeatures
                feature="isAppRedesign"
                on={<ProfileCardRedesignError />}
                off={<ProfileCardDeprecatedError />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={<ProfileCardRedesign {...props} />}
            off={<ProfileCardDeprecated {...props} />}
        />
    );
};

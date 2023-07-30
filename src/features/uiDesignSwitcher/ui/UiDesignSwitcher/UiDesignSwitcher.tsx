import { useTranslation } from 'react-i18next';
import {memo, useState} from 'react';
import { ListBox } from '@/shared/ui/redesign/Popups';
import {getFeatureFlag, updateFeatureFlag} from '@/shared/lib/features';
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Text} from "@/shared/ui/redesign/Text";
import {HStack} from "@/shared/ui/redesign/Stack";
import {Skeleton} from "@/shared/ui/redesign/Skeleton";

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation('settings-page');
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);
    const isAppRedesign = getFeatureFlag('isAppRedesign');

    const items = [
        {
            content: t('Новый'),
            value: 'new',
        },
        {
            content: t('Старый'),
            value: 'old',
        },
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlag({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesign: value === 'new',
                    },
                }),
            ).unwrap();
            setIsLoading(false);
        }
    };

    return (
        <HStack>
            <Text text={t('Вариант интерфейса')} />
            {isLoading ? (
                <Skeleton width={100} height={40} />
            ) : (
                <ListBox
                    onChange={onChange}
                    items={items}
                    value={isAppRedesign ? 'new' : 'old'}
                    className={className}
                />
            )}
        </HStack>
    );
});

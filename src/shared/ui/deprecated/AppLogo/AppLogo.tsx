import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import AppSvg from '../../../assets/icons/app-image.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
}

/**
 * @deprecated
 */
export const AppLogo = memo((props: AppLogoProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.AppLogo, {}, [className])}
        >
            <div className={cls.gradientBig}></div>
            <div className={cls.gradientSmall}></div>
            <AppSvg className={cls.appLogo}/>
        </HStack>
    );
});

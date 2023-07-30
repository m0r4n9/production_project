import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLogo.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import AppSvg from '../../../assets/icons/app-image.svg';
import { HStack } from '../Stack';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { className, size = 50} = props;
    const { t } = useTranslation();

    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.AppLogo, {}, [className])}
        >
            <AppSvg width={size} height={size} color='black' className={cls.appLogo}/>
            <div className={cls.gradientBig}></div>
            <div className={cls.gradientSmall}></div>
        </HStack>
    );
});

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LangSwitcher.module.scss';
import { useTranslation } from 'react-i18next';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesign/Button';

interface LangSwithcerProps {
    className?: string;
    short?: boolean;
}

/**
 * @deprecated
 */
export const LangSwithcer = memo(({ className, short }: LangSwithcerProps) => {
    const { t, i18n } = useTranslation();

    const switchLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={
                <Button variant="clear" onClick={switchLang}>
                    {t(short ? 'Короткий язык' : 'Язык')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    theme={ThemeButton.CLEAR}
                    onClick={switchLang}
                    className={classNames(cls.LangSwithcer, {}, [className])}
                >
                    {t(short ? 'Короткий язык' : 'Язык')}
                </ButtonDeprecated>
            }
        />
    );
});

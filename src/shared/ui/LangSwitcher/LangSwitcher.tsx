import {classNames} from "shared/lib/classNames/classNames";
import cls from './LangSwitcher.module.scss'
import {useTranslation} from "react-i18next";
import Button, {ThemeButton} from "shared/ui/Button/Button";

interface LangSwithcerProps {
    className?: string;
}

const LangSwithcer = ({className}: LangSwithcerProps) => {
    const {t, i18n} = useTranslation();

    const switchLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    }

    return (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={switchLang}
            className={classNames(cls.LangSwithcer, {}, [className])}
        >
            {t('Язык')}
        </Button>
    );
};

export default LangSwithcer;

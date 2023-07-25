import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ForbiddenPage.module.scss';
import { memo } from 'react';
import {Page} from "@/widgets/Page";

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = (props: ForbiddenPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <Page className={classNames(cls.ForbiddenPage, {}, [className])}>
            {t('У вас недостаточно прав')}
        </Page>
    );
};

export default memo(ForbiddenPage);

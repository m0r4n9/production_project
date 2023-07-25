import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './AdminPanelPage.module.scss';
import { memo } from 'react';
import {Page} from "@/widgets/Page";

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    
    return (
        <Page className={classNames(cls.AdminPanelPage, {}, [className])}>
           ADMIN PANEL
        </Page>
    );
};

export default memo(AdminPanelPage);

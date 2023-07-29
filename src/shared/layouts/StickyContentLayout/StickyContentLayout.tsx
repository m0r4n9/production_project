import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StickyContentLayout.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, ReactElement } from 'react';

interface StickyContentLayoutProps {
    className?: string;
    left?: ReactElement;
    content: ReactElement;
    right?: ReactElement;
}

export const StickyContentLayout = memo((props: StickyContentLayoutProps) => {
    const { className, left, content, right } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.StickyContentLayout, {}, [className])}>
            {right && <div className={cls.left}>{left}</div>}
            <div className={cls.content}>{content}</div>
            {left && <div className={cls.right}>{right}</div>}
        </div>
    );
});

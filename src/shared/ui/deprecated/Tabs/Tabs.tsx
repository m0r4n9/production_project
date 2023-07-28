import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Tabs.module.scss';
import {memo, ReactNode, useCallback} from 'react';
import {Card, CardTheme} from "@/shared/ui/deprecated/Card";

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}

/**
 * @deprecated
 */
export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        onTabClick
    } = props;

    // Механизм замыкания
    const clickHandle = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab);
        }
    }, []);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map(tab => (
                <Card
                    key={tab.value}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    onClick={clickHandle(tab)}
                    className={cls.tab}
                >
                    {tab.value}
                </Card>
            ))}
        </div>
    );
});

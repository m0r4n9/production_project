import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import React, {memo, useMemo, useState} from "react";
import {ThemeSwitcher} from "@/shared/ui/ThemeSwitcher";
import {LangSwithcer} from "@/shared/ui/LangSwitcher";
import {Button, ButtonSize, ThemeButton} from "@/shared/ui/Button";
import {SidebarItem} from "../SidebarItem/SidebarItem";
import {useSelector} from "react-redux";
import {getSidebarItems} from "../../model/selectors/getSidebarItems";
import {VStack} from "@/shared/ui/Stack";


interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({className}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed(prevState => !prevState)
    };

    const itemList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed, sidebarItemsList]);

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ThemeButton.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack
                align='start'
                gap={'8'}
                className={cls.items}
            >
                {itemList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher/>
                <LangSwithcer
                    className={cls.lang}
                />
            </div>
        </aside>
    );
});

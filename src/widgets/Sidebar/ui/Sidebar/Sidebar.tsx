import {classNames} from "shared/lib/classNames/classNames";
import cls from './Sidebar.module.scss';
import React, {memo, useMemo, useState} from "react";
import {ThemeSwitcher} from "shared/ui/ThemeSwitcher";
import LangSwithcer from "shared/ui/LangSwitcher/LangSwitcher";
import {Button, ButtonSize, ThemeButton} from "shared/ui/Button/Button";
import {SidebarItem} from "../SidebarItem/SidebarItem";
import {useSelector} from "react-redux";
import {getSidebarItems} from "../../model/selectors/getSidebarItems";
import {VStack} from "shared/ui/Stack/VStack/VStack";
import {HStack} from "shared/ui/Stack/HStack/HStack";
import {Flex} from "shared/ui/Stack/Flex/Flex";


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
        <menu
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
            <VStack gap={'8'} className={cls.items}>
                {itemList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher/>
                <LangSwithcer
                    className={cls.lang}
                />
            </div>
        </menu>
    );
});

import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import React, { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from '@/shared/ui/deprecated/ThemeSwitcher';
import { LangSwithcer } from '@/shared/ui/deprecated/LangSwitcher';
import { Button, ButtonSize, ThemeButton } from '@/shared/ui/deprecated/Button';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { VStack } from '@/shared/ui/redesign/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesign/AppLogo';
import { Icon } from '@/shared/ui/redesign/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        console.log(collapsed);
        setCollapsed((prevState) => !prevState);
    };

    const itemList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.SidebarRedesign,
                        { [cls.collapsedRedesign]: collapsed },
                        [className],
                    )}
                >
                    <AppLogo
                        size={collapsed ? 30 : 50}
                        className={cls.appLogo}
                    />
                    <VStack align="start" gap={'8'} className={cls.items}>
                        {itemList}
                    </VStack>
                    <Icon
                        Svg={ArrowIcon}
                        clickable
                        onClick={onToggle}
                        className={cls.collapseBtn}
                    />
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwithcer short={collapsed} className={cls.lang} />
                    </div>
                </aside>
            }
            off={
                <aside
                    data-testid="sidebar"
                    className={classNames(
                        cls.Sidebar,
                        { [cls.collapsed]: collapsed },
                        [className],
                    )}
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
                    <VStack align="start" gap={'8'} className={cls.items}>
                        {itemList}
                    </VStack>
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                        <LangSwithcer short={collapsed} className={cls.lang} />
                    </div>
                </aside>
            }
        />
    );
});

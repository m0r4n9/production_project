import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ScrollToolBar.module.scss';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesign/Stack';
import { ScrollToTopButton } from '@/features/scrollToTopButton';

interface ScrollToolBarProps {
    className?: string;
}

export const ScrollToolBar = memo((props: ScrollToolBarProps) => {
    const { className } = props;

    return (
        <VStack
            justify="center"
            align="center"
            max
            className={classNames(cls.ScrollToolBar, {}, [className])}
        >
            <ScrollToTopButton />
        </VStack>
    );
});

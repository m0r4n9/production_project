import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './ArticleViewSelector.module.scss';
import {memo} from 'react';
import ListIcon from '@/shared/assets/icons/list-24-24.svg';
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg';
import {Button, ThemeButton} from "@/shared/ui/Button";
import {Icon} from "@/shared/ui/Icon";
import {ArticleView} from "../../model/consts/consts";

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}


const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: ListIcon,
    },
    {
        view: ArticleView.BIG,
        icon: TiledIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {className, view, onViewClick} = props;

    // Почитать про это. Своего рода замыкание
    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map(viewType => (
                <Button
                    key={viewType.view}
                    theme={ThemeButton.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames('', {[cls.selected]: viewType.view === view}, [])}
                    />
                </Button>
            ))}
        </div>
    );
});

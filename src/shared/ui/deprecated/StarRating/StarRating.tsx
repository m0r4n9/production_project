import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './StarRating.module.scss';
import {memo, useState} from 'react';
import {Icon} from "@/shared/ui/deprecated/Icon";
import StarIcon from '@/shared/assets/icons/star.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (starCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
    const {
        className,
        size = 50,
        selectedStars = 0,
        onSelect
    } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    }

    const onClick = (starCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starCount);
            setCurrentStarsCount(starCount);
            setIsSelected(true);
        }
    }

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map(starNumber => (
                <Icon
                    Svg={StarIcon}
                    key={starNumber}
                    height={size}
                    width={size}
                    onMouseEnter={onHover(starNumber)}
                    onMouseLeave={onLeave}
                    onClick={onClick(starNumber)}
                    className={classNames(
                        cls.starIcon,
                        {
                            [cls.hovered]: currentStarsCount >= starNumber,
                            [cls.normal]: !(currentStarsCount >= starNumber),
                            [cls.selected]: isSelected
                        },
                        []
                    )}
                />
            ))}
        </div>
    );
});

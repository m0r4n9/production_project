import {classNames} from "shared/lib/classNames/classNames";
import cls from './Avatar.module.scss';
import {CSSProperties, useMemo} from "react";

interface AvatarProps {
    className?: string;
    src?: string
    alt?: string;
    size?: number;
}

export const Avatar = (props: AvatarProps) => {
    const {className, src, size} = props;

    const styles = useMemo<CSSProperties>(() => ({
            width: size || 100,
            height: size || 100,
    }), [size])

    return (
        <img
            src={src}
            style={styles}
            className={classNames(cls.Avatar, {}, [className])}
            alt='avatar'
        />
    );
};

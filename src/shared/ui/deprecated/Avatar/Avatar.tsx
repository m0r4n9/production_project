import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Avatar.module.scss';
import {CSSProperties, useMemo} from "react";
import {AppImage} from "../AppImage";
import UserFilledIcon from '../../../assets/icons/user-filled.svg';
import {Icon} from "../Icon";
import {Skeleton} from "../Skeleton";

interface AvatarProps {
    className?: string;
    src?: string
    alt?: string;
    size?: number;
    inverted?: boolean;
}

/**
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        inverted
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
            width: size,
            height: size,
    }), [size])

    const fallback = <Skeleton width={size} height={size} border='50%'/>
    const errorFallback = <Icon inverted={inverted} Svg={UserFilledIcon} width={size} height={size}/>

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            style={styles}
            className={classNames(cls.Avatar, {}, [className])}
            alt='avatar'
        />
    );
};

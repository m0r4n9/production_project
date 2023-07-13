import {classNames} from "shared/lib/classNames/classNames";
import cls from './Icon.module.scss';
import React from "react";

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = (props: IconProps) => {
    const {className, Svg} = props;

    return (
        <Svg className={classNames(cls.Icon, {}, [className])}/>
    );
};

import {classNames} from "shared/lib/classNames/classNames";
import cls from './Icon.module.scss';
import React from "react";

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = (props: IconProps) => {
    const {className, Svg, inverted} = props;


    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}/>
    );
};

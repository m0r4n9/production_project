import {DropDownDirection} from "../../../types/ui";
import cls from './pupup.module.scss';

export const mapDirectionClass: Record<DropDownDirection, string> = {
    'bottom left': cls.optionBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionTopLeft,
    'top right': cls.optionTopRight,
}

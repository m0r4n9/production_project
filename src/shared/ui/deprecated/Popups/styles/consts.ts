import {DropdownDirection} from "../../../../types/ui";
import cls from './pupup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionTopLeft,
    'top right': cls.optionTopRight,
}

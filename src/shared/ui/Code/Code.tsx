import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './Code.module.scss';
import {ReactNode, useCallback} from "react";
import {Button, ThemeButton} from "@/shared/ui/Button";
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = (props: CodeProps) => {
    const {
        className,
        text
    } = props;

    const onCopy = useCallback(() => {
        // Добавить оповещение о том, что текст скопирован
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button onClick={onCopy} className={cls.copyBtn} theme={ThemeButton.CLEAR}>
                <CopyIcon className={cls.copyIcon}/>
            </Button>
            <code>
                {text}
            </code>
        </pre>
    );
};

import {classNames} from "shared/lib/classNames/classNames";
import cls from './Page.module.scss';
import {memo, MutableRefObject, ReactNode, useRef, UIEvent, useEffect} from 'react';
import {useInfiniteScroll} from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {getScrollSaveByPath, saveScrollActions} from "features/ScrollSave";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateSchema} from "app/providers/StoreProvider";
import {useThrottle} from "shared/lib/hooks/useThrottle/useThrottle";

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const {className, children, onScrollEnd} = props;
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollSaveByPath(state, pathname)
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, []);

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        console.log('scroll')
        dispatch(saveScrollActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname
        }))
    }, 1000);

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef}/> : null}
        </section>
    );
});

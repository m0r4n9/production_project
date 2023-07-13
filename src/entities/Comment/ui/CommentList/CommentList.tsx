import {classNames} from "shared/lib/classNames/classNames";
import cls from './CommentList.module.scss';
import {memo} from 'react';
import {Comment} from "../../model/types/comment";
import {Text} from "shared/ui/Text/Text";
import {useTranslation} from "react-i18next";
import {CommentCard} from "../CommentCard/CommentCard";

interface CommentListProps {
    className?: string;
    isLoading?: boolean;
    commentList?: Comment[];
}

export const CommentList = memo((props: CommentListProps) => {
    const {className, isLoading, commentList} = props;
    const {t} = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading={true}/>
                <CommentCard isLoading={true}/>
                <CommentCard isLoading={true}/>
            </div>
        )
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {commentList?.length
                ? commentList.map(comment => (
                    <CommentCard
                        key={comment.id}
                        className={cls.comment}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
                : <Text text={t('Комментарии отсутствуют')}/>
            }
        </div>
    );
});

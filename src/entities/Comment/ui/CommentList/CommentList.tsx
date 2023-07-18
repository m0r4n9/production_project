import {classNames} from "shared/lib/classNames/classNames";
import {memo} from 'react';
import {Comment} from "../../model/types/comment";
import {Text} from "shared/ui/Text/Text";
import {useTranslation} from "react-i18next";
import {CommentCard} from "../CommentCard/CommentCard";
import {VStack} from "shared/ui/Stack/VStack/VStack";

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
            <VStack gap='16' className={classNames('', {}, [className])}>
                <CommentCard isLoading={true}/>
                <CommentCard isLoading={true}/>
                <CommentCard isLoading={true}/>
            </VStack>
        )
    }

    return (
        <VStack
            max
            gap='16'
            className={classNames('', {}, [className])}
        >
            {commentList?.length
                ? commentList.map(comment => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
                : <Text text={t('Комментарии отсутствуют')}/>
            }
        </VStack>
    );
});

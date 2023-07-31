import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from 'react';
import {Comment} from "../../model/types/comment";
import {Text as TextDeprecated} from "@/shared/ui/deprecated/Text";
import {useTranslation} from "react-i18next";
import {CommentCard} from "../CommentCard/CommentCard";
import {VStack} from "@/shared/ui/redesign/Stack";

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
            <VStack gap='16' max className={classNames('', {}, [className])}>
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
                : <TextDeprecated text={t('Комментарии отсутствуют')}/>
            }
        </VStack>
    );
});

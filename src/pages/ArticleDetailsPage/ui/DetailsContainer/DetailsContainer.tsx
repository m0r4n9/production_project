import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from 'react';
import {ArticleDetails} from "@/entities/Article";
import {useParams} from "react-router-dom";
import {Card} from "@/shared/ui/redesign/Card";

interface DetailsContainerProps {
    className?: string;
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
    const {className} = props;
    const { id } = useParams<{ id: string }>();

    return (
        <Card fullWidth border='round' padding='24' className={className}>
            <ArticleDetails id={id} />
        </Card>
    );
});

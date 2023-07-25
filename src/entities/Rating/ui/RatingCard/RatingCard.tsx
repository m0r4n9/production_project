import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './RatingCard.module.scss';
import {useTranslation} from "react-i18next"
import {memo, useCallback, useState} from 'react';
import {Card} from "@/shared/ui/Card/Card";
import {VStack} from "@/shared/ui/Stack/VStack/VStack";
import {Text} from "@/shared/ui/Text/Text";
import {StarRating} from "@/shared/ui/StarRating/StarRating";
import {Modal} from "@/shared/ui/Modal/Modal";
import {Input} from "@/shared/ui/Input/Input";
import {HStack} from "@/shared/ui/Stack/HStack/HStack";
import {Button, ThemeButton} from "@/shared/ui/Button/Button";
import {BrowserView, MobileView} from "react-device-detect";
import {Drawer} from "@/shared/ui/Drawer/Drawer";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starCount: number) => void;
    onAccept?: (starCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        feedbackTitle,
        onAccept,
        onCancel,
        hasFeedback,
        title
    } = props;
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle}/>
            <Input
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
            />
        </>
    )

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align='center' gap='8'>
                <Text title={title}/>
                <StarRating size={40} onSelect={onSelectStars}/>
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen}>
                    <VStack max gap='32'>
                        {modalContent}
                        <HStack max gap='16' justify='end'>
                            <Button onClick={cancelHandler} theme={ThemeButton.OUTLINE_RED}>
                                {t('Закрыть')}
                            </Button>
                            <Button onClick={acceptHandler} theme={ThemeButton.OUTLINE}>
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} onClose={cancelHandler} lazy>
                    <VStack gap='16'>
                        {modalContent}
                        <Button onClick={acceptHandler} fullWidth theme={ThemeButton.OUTLINE}>
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});

import {useTranslation} from "react-i18next"
import {memo, useCallback, useState} from 'react';
import {Card} from "@/shared/ui/Card";
import {VStack} from "@/shared/ui/Stack";
import {Text} from "@/shared/ui/Text";
import {StarRating} from "@/shared/ui/StarRating";
import {Modal} from "@/shared/ui/Modal";
import {Input} from "@/shared/ui/Input";
import {HStack} from "@/shared/ui/Stack";
import {Button, ThemeButton} from "@/shared/ui/Button";
import {BrowserView, MobileView} from "react-device-detect";
import {Drawer} from "@/shared/ui/Drawer";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starCount: number) => void;
    onAccept?: (starCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        feedbackTitle,
        onAccept,
        onCancel,
        hasFeedback,
        title,
        rate = 0
    } = props;
    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
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
        <Card fullWidth className={className}>
            <VStack align='center' gap='8'>
                <Text title={starsCount ? t('Спасибо за оценку') : title}/>
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars}/>
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

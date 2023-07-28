import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation('greeting-modal');
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageWasOpened } = useJsonSettings();

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
        }
    }, [dispatch, isArticlesPageWasOpened]);

    const onClose = () => setIsOpen(false);

    const text = (
        <Text
            title={t('Добро пожаловать')}
            text={t(
                'Здесь вы можете искать и просматривать статьи на различные темы',
            )}
        />
    );

    if (isMobile) {
        return (
            <Drawer lazy onClose={onClose} isOpen={isOpen}>
                {text}
            </Drawer>
        );
    }

    return <Modal lazy onClose={onClose} isOpen={isOpen}></Modal>;
});

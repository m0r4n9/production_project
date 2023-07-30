import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import {Text} from "@/shared/ui/redesign/Text";
import {Page} from "@/widgets/Page";
import {VStack} from "@/shared/ui/redesign/Stack";
import {UiDesignSwitcher} from "@/features/uiDesignSwitcher";

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = (props: SettingsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('settings-page');

    return (
        <Page>
            <VStack gap='16'>
                <Text title={t('Настройки пользователя')}/>
                <UiDesignSwitcher/>
            </VStack>
        </Page>
    );
};

export default memo(SettingsPage);

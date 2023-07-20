import {classNames} from "shared/lib/classNames/classNames";
import {Page} from "widgets/Page";
import {VStack} from "shared/ui/Stack/VStack/VStack";
import {EditProfileCard} from "features/editProfileCard";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Text} from "shared/ui/Text/Text";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const {t} = useTranslation('profile');
    const {id} = useParams<{ id: string }>();

    if (!id) {
        return <Text title={t('Профиль не найден')}/>
    }

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack
                max
                gap='16'
            >
                <EditProfileCard id={id}/>
            </VStack>
        </Page>
    );
};

export default ProfilePage;

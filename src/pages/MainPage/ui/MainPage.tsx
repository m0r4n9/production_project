import {useTranslation} from "react-i18next";
import {Page} from "widgets/Page";
import {HStack} from "shared/ui/Stack/HStack/HStack";
import {Dropdown} from "shared/ui/Dropdown/Dropdown";

const MainPage = () => {
    const {t} = useTranslation('about');

    return (
        <Page>
            {t("Главная страница")}
            <HStack>
                <div>test</div>
            </HStack>
        </Page>
    )
};

export default MainPage;

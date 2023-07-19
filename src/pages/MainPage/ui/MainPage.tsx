import {useTranslation} from "react-i18next";
import {Page} from "widgets/Page";
import {ListBox} from "shared/ui/ListBox/ListBox";
import {HStack} from "shared/ui/Stack/HStack/HStack";

const MainPage = () => {
    const {t} = useTranslation('about');

    return (
        <Page>
            {t("Главная страница")}
            <HStack>
                <div>test</div>
                <ListBox
                    defaultValue='Выберите значение'
                    onChange={(value: string) => {}}
                    value={undefined}
                    items={[
                        {value: '1', content: '123'},
                        {value: '2', content: 'disabled', disabled: true},
                        {value: '3', content: 'active id 3'},
                    ]}
                />
            </HStack>
        </Page>
    )
};

export default MainPage;

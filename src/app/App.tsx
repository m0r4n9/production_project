import './styles/index.scss';
import {classNames} from "shared/lib/classNames/classNames";
import { useTheme } from './providers/ThemeProvider';
import {AppRoute} from "app/providers/router";
import {Navbar} from "widgets/Navbar";

const App = () => {
    const { theme } = useTheme();


    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar/>
            <AppRoute/>
        </div>
    );
};

export default App;
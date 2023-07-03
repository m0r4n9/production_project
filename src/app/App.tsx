import './styles/index.scss';
import {classNames} from "shared/lib/classNames/classNames";
import {useTheme} from './providers/ThemeProvider';
import {AppRoute} from "app/providers/router";
import {Navbar} from "widgets/Navbar";
import {Sidebar} from 'widgets/Sidebar';
import {Suspense} from "react";


const App = () => {
    const {theme} = useTheme();



    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar/>
                <div className="content-page">
                    <Sidebar/>
                    <div className="page-wrapper">
                        <AppRoute/>
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default App;

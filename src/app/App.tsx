import {classNames} from "@/shared/lib/classNames/classNames";
import {useTheme} from './providers/ThemeProvider';
import {AppRoute} from "@/app/providers/router";
import {Navbar} from "@/widgets/Navbar";
import {Sidebar} from '@/widgets/Sidebar';
import {Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInited, userActions} from "@/entities/User";


const App = () => {
    const {theme} = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar/>
                <div className="content-page">
                    <Sidebar/>
                    {inited && <AppRoute/>}
                </div>
            </Suspense>
        </div>
    );
};

export default App;

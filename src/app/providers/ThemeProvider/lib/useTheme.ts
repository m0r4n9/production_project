import {
    LOCAL_STORAGE_THEME_KEY,
    Theme,
    ThemeContext,
} from '@/app/providers/ThemeProvider/lib/ThemeContext';
import { useContext } from 'react';

interface UseThemeResult {
    toggleTheme: (saveAction: (theme: Theme) => void) => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = (saveAction?: (theme: Theme) => void) => {
        let newTheme: Theme;
        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT;
                break;
            case Theme.LIGHT:
                newTheme = Theme.PURPLE;
                break;
            case Theme.PURPLE:
                newTheme = Theme.DARK;
                break;
            default:
                newTheme = Theme.LIGHT;
                break;
        }
        setTheme?.(newTheme);
        saveAction?.(newTheme);
        document.body.className = newTheme;
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}

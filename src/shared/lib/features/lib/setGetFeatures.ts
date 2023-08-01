import { FeatureFlags } from '@/shared/types/featureFlags';
import { LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';

const defaultFeatures: FeatureFlags = {
    isAppRedesign:
        localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new',
};

// фичи в ходе сессии не меняются
let featureFlags: FeatureFlags = {
    ...defaultFeatures,
};

// context - теряем возможность использовать флаги вне react
// state redux - теряем возможность использовать флаги вне redux
// reload page
// костыль
export function setFeaturesFlag(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags?.[flag];
}

export function getAllFeatureFlags() {
    return featureFlags;
}

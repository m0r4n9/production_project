import { FeatureFlags } from '@/shared/types/featureFlags';

// фичи в ходе сессии не меняются
let featureFlags: FeatureFlags;

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

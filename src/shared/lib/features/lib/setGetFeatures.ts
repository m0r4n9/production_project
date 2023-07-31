import { FeatureFlags } from '@/shared/types/featureFlags';

// фичи в ходе сессии не меняются
let featureFlags: FeatureFlags;

export function setFeaturesFlag(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
    return featureFlags?.[flag] ?? true;
}

export function getAllFeatureFlags() {
    return featureFlags;
}

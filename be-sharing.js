import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeSharing extends EventTarget {
    async camelToCanonical(pp) {
        const { camelConfig } = pp;
        const { Set } = camelConfig;
        const { parseSet } = await import('be-decorated/cpu.js');
        parseSet(Set, camelConfig);
        let { homeInOnPath, observingRealm, sharingRealm } = camelConfig;
        observingRealm = observingRealm || 'parent';
        sharingRealm = sharingRealm || observingRealm;
        const canonicalConfig = {
            homeInOnPath,
            observingRealm,
            sharingRealm,
            share: []
        };
        return {
            canonicalConfig
        };
    }
    async onCanonical(pp, mold) {
        return mold;
    }
}
const tagName = 'be-sharing';
const ifWantsToBe = 'sharing';
const upgrade = 'script';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: [upgrade],
            virtualProps: ['camelConfig', 'canonicalConfig'],
            primaryProp: 'camelConfig',
            parseAndCamelize: true,
        },
        actions: {
            camelToCanonical: 'camelConfig',
            onCanonical: {
                ifAllOf: ['canonicalConfig', 'camelConfig'],
                returnObjMold: {
                    resolved: true,
                }
            }
        }
    },
    complexPropDefaults: {
        controller: BeSharing
    }
});
register(ifWantsToBe, upgrade, tagName);

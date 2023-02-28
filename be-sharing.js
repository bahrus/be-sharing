import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeSharing extends EventTarget {
    async camelToCanonical(pp) {
        const { camelConfig } = pp;
        const { Set } = camelConfig;
        if (Set !== undefined) {
            const { parseSet } = await import('be-decorated/cpu.js');
            parseSet(Set, camelConfig);
        }
        let { homeInOnPath, observingRealm, sharingRealm } = camelConfig;
        observingRealm = observingRealm || 'parent';
        sharingRealm = sharingRealm || observingRealm;
        const canonicalConfig = {
            homeInOnPath,
            observingRealm,
            sharingRealm,
            share: []
        };
        const { share } = canonicalConfig;
        const { Share, shareExpressions } = camelConfig;
        if (Share !== undefined) {
            const { tryParse } = await import('be-decorated/cpu.js');
            for (const key of Share) {
                const spcqdp = tryParse(key, reSrcPropToCamelQryAsDomProp);
                if (spcqdp != null) {
                    share.push({
                        props: [spcqdp.srcProp],
                        transform: {
                            [spcqdp.camelQry]: { [spcqdp.domProp]: spcqdp.srcProp }
                        },
                    });
                    continue;
                }
                const spcq = tryParse(key, reSrcPropToCamelQry);
                if (spcq !== null) {
                    share.push({
                        props: [spcq.srcProp],
                        transform: {
                            [spcq.camelQry]: spcq.srcProp
                        }
                    });
                    continue;
                }
            }
        }
        if (shareExpressions !== undefined) {
            const { tryParse } = await import('be-decorated/cpu.js');
            for (const key in shareExpressions) {
                const sp = tryParse(key, reSrcPropsTo);
                if (sp !== null) {
                    const { lc } = await import('be-decorated/cpu.js');
                    share.push({
                        props: sp.srcProps.split(reAndSplit).map(s => lc(s)),
                        transform: shareExpressions[key]
                    });
                }
            }
        }
        return {
            canonicalConfig
        };
    }
    async onCanonical(pp, mold) {
        return mold;
    }
}
const reSrcPropsTo = /^(?<srcProps>[\w\\]+)(?<!\\)To/;
const reAndSplit = /(?<!\\)And/g;
const reSrcPropToCamelQry = /^(?<srcProp>[\w\\]+)(?<!\\)To(?<camelQry>\w+)/;
const reSrcPropToCamelQryAsDomProp = /^(?<srcProp>[\w\\]+)(?<!\\)To(?<camelQry>\w+)(?<!\\)As(?<domProp>\w+)/;
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
            primaryPropReq: true,
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

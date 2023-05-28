import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeSharing extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'camelConfig',
            cache: new Map(),
            primaryPropReq: true,
            parseAndCamelize: true,
            // camelizeOptions: {
            //     booleans: ['Debug', 'Skip', 'Nudge']
            // },
        };
    }
    async camelToCanonical(self) {
        const { camelConfig, enhancedElement, parsedFrom } = self;
        if (parsedFrom !== undefined) {
            const canonicalConfig = cachedCanonicals[parsedFrom];
            if (canonicalConfig !== undefined) {
                return {
                    canonicalConfig
                };
            }
        }
        const { arr } = await import('be-enhanced/cpu.js');
        const camelConfigArr = arr(camelConfig);
        let mergedSettings;
        const canonicalConfig = {
            links: [],
            //settings: mergedSettings,
        };
        const { links } = canonicalConfig;
        for (const cc of camelConfigArr) {
            const { Share, } = cc;
            if (Share !== undefined) {
                const { prsShare } = await import('be-linked/prsShare.js');
                await prsShare(cc, links, self);
            }
        }
        return {
            canonicalConfig
        };
    }
    async onCanonical(self) {
        const { canonicalConfig } = self;
        const { links, settings } = canonicalConfig;
        if (links !== undefined) {
            const shareableLinks = links.filter(link => link.share !== undefined);
            if (shareableLinks.length > 0) {
                const { share } = await import('be-linked/share.js');
                for (const shareableLink of shareableLinks) {
                    share(self, shareableLink);
                }
            }
        }
        return {
            resolved: true
        };
    }
}
const cachedCanonicals = {};
const tagName = 'be-sharing';
const ifWantsToBe = 'sharing';
const upgrade = 'template,script';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults
        },
        propInfo: {
            ...propInfo,
        },
        actions: {
            camelToCanonical: 'camelConfig',
            onCanonical: {
                ifAllOf: ['canonicalConfig', 'camelConfig'],
            }
        }
    },
    superclass: BeSharing
});
register(ifWantsToBe, upgrade, tagName);

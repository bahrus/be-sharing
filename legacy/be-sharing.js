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
            defaultBucket: 'Share',
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
                    share(self, shareableLink, false);
                }
            }
        }
        return {
            resolved: true
        };
    }
    async share(bva, name, value, prevMatches) {
        const { getIPsInScope } = await import('be-linked/getIPsInScope.js');
        const { enhancedElement } = this;
        let matches = prevMatches;
        if (matches === undefined) {
            const ips = getIPsInScope(enhancedElement);
            const matches = ips.filter(x => x.names.includes(name));
            if (matches.length === 0) {
                let localName = 'meta';
                switch (typeof value) {
                    case 'boolean':
                        localName = 'link';
                        break;
                }
                const newEl = document.createElement(localName);
                newEl.setAttribute('itemprop', name);
                enhancedElement.appendChild(newEl);
                matches.push({
                    el: newEl,
                    names: [name]
                });
            }
        }
        for (const match of matches) {
            const el = match.el;
            const bvaTarget = await el.beEnhanced.whenAttached('be-value-added');
            bvaTarget.value = value;
        }
        return matches;
    }
}
const cachedCanonicals = {};
const tagName = 'be-sharing';
const ifWantsToBe = 'sharing';
const upgrade = '*';
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

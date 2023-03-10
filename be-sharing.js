import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeSharing extends EventTarget {
    async camelToCanonical(pp) {
        const { camelConfig } = pp;
        let { scrutinize, observe, sharingRealm } = camelConfig;
        observe = observe || 'previousElementSibling';
        sharingRealm = sharingRealm || observe;
        let homeInOnResolvedEventName = undefined;
        if (scrutinize !== undefined) {
            const { beSplit } = await import('be-decorated/cpu.js');
            const split = await beSplit(scrutinize);
            if (split !== undefined) {
                homeInOnResolvedEventName = split.eventName;
                scrutinize = split.path;
            }
        }
        const canonicalConfig = {
            scrutinize,
            homeInOnResolvedEventName,
            observe,
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
    #sharingRealmRef;
    #observingRef;
    async onCanonical(pp, mold) {
        const { canonicalConfig, self } = pp;
        const { sharingRealm, observe, scrutinize, share } = canonicalConfig;
        if (share === undefined || share.length === 0)
            return mold;
        let sharingRef;
        if (this.#sharingRealmRef !== undefined) {
            sharingRef = this.#sharingRealmRef.deref();
        }
        if (sharingRef === undefined) {
            const { findRealm } = await import('trans-render/lib/findRealm.js');
            sharingRef = await findRealm(self, sharingRealm);
            this.#sharingRealmRef = new WeakRef(sharingRef);
        }
        let observingRef;
        if (observe === sharingRealm) {
            observingRef = sharingRef;
        }
        else {
            if (this.#observingRef !== undefined) {
                observingRef = this.#observingRef.deref();
            }
            if (observingRef === undefined) {
                const { findRealm } = await import('trans-render/lib/findRealm.js');
                observingRef = await findRealm(self, observe);
                this.#observingRef = new WeakRef(observingRef);
            }
        }
        let host = observingRef;
        if (scrutinize !== undefined) {
            const { homeInOn } = await import('trans-render/lib/homeInOn.js');
            const { homeInOnResolvedEventName } = canonicalConfig;
            host = await homeInOn(observingRef, scrutinize, homeInOnResolvedEventName);
        }
        if (!host._isPropagating) {
            const { doBeHavings } = await import('trans-render/lib/doBeHavings.js');
            import('be-propagating/be-propagating.js');
            await doBeHavings(host, [{
                    be: 'propagating',
                    waitForResolved: true,
                }]);
        }
        const { DTR } = await import('trans-render/lib/DTR.js');
        for (const shareInstance of share) {
            const { transform, props } = shareInstance;
            const ctx = {
                host,
                match: transform,
            };
            const dtr = new DTR(ctx);
            await dtr.transform(sharingRef);
            for (const prop of props) {
                host.addEventListener(prop, e => {
                    dtr.transform(sharingRef);
                });
            }
        }
        return mold;
    }
}
const reSrcPropsTo = /^(?<srcProps>[\w\\]+)(?<!\\)To/;
const reAndSplit = /(?<!\\)And/g;
const reSrcPropToCamelQry = /^(?<srcProp>[\w\\]+)(?<!\\)To(?<camelQry>\w+)/;
const reSrcPropToCamelQryAsDomProp = /^(?<srcProp>[\w\\]+)(?<!\\)To(?<camelQry>\w+)(?<!\\)As(?<domProp>\w+)/;
const tagName = 'be-sharing';
const ifWantsToBe = 'sharing';
const upgrade = 'script,template';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: ['script', 'template'],
            virtualProps: ['camelConfig', 'canonicalConfig'],
            primaryProp: 'camelConfig',
            parseAndCamelize: true,
            camelizeOptions: {
                doSets: true,
                simpleSets: ['Observe', 'Scrutinize']
            },
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

import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, CanonicalConfig} from './types';

export class BeSharing extends EventTarget implements Actions{
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        const {Set} = camelConfig!;
        const {parseSet} = await import('be-decorated/cpu.js');
        parseSet(Set, camelConfig);

        let {homeInOnPath, observingRealm, sharingRealm} = camelConfig!;
        observingRealm =  observingRealm || 'parent';
        sharingRealm = sharingRealm || observingRealm;
        const canonicalConfig: CanonicalConfig = {
            homeInOnPath,
            observingRealm,
            sharingRealm,
            share: []
        };
        return {
            canonicalConfig
        } as PPP;
    }

    async onCanonical(pp: PP, mold: Partial<PP>): Promise<PPP> {
        return mold;
    }
}

const tagName = 'be-sharing';
const ifWantsToBe = 'sharing';
const upgrade = 'script';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
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

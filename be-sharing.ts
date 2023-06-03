import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {SharingCamelConfig, CanonicalConfig, Settings} from 'be-linked/types';
import {register} from 'be-hive/register.js';
import {JSONValue} from 'trans-render/lib/types';

export class BeSharing extends BE<AP, Actions> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
            primaryProp: 'camelConfig',
            cache: new Map<string, JSONValue>(),
            primaryPropReq: true,
            parseAndCamelize: true,
            defaultBucket: 'Share',
            // camelizeOptions: {
            //     booleans: ['Debug', 'Skip', 'Nudge']
            // },
        } as BEConfig<SharingCamelConfig>
    }

    async camelToCanonical(self: this): ProPAP {
        const {camelConfig, enhancedElement, parsedFrom} = self;

        if(parsedFrom !== undefined) {
            const canonicalConfig = cachedCanonicals[parsedFrom];
            if(canonicalConfig !== undefined){
                return {
                    canonicalConfig
                };
            }

        }

        const {arr} = await import('be-enhanced/cpu.js');
        const camelConfigArr = arr(camelConfig);
        let mergedSettings: Settings |  undefined;
        const canonicalConfig: CanonicalConfig = {
            links: [],
            //settings: mergedSettings,
        };
        const {links} = canonicalConfig;
        for(const cc of camelConfigArr){
            const {
                Share,
            } = cc;
            if(Share !== undefined){
                const {prsShare} = await import('be-linked/prsShare.js');
                await prsShare(cc, links, self);
            }
        }
        return {
            canonicalConfig
        };
    }

    async onCanonical(self: this): ProPAP {
        const {canonicalConfig} = self;
        const {links, settings} = canonicalConfig!;
        if(links !== undefined){
            const shareableLinks = links.filter(link => link.share !== undefined);
            if(shareableLinks.length > 0){
                const {share} = await import('be-linked/share.js');
                for(const shareableLink of shareableLinks){
                    share(self, shareableLink);
                }
            }
        }
        return {
            resolved: true
        };
    }
}

export interface BeSharing extends AllProps{}

const cachedCanonicals: {[key: string]: CanonicalConfig} = {};

const tagName = 'be-sharing';
const ifWantsToBe = 'sharing';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config:{
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
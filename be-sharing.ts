import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import { Matches } from 'trans-render/lib/types';
import {Actions, PP, Proxy, PPP, CanonicalConfig, DynamicShareKey} from './types';

export class BeSharing extends EventTarget implements Actions{
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        const {Set} = camelConfig!;
        if(Set !== undefined){
            const {parseSet} = await import('be-decorated/cpu.js');
            parseSet(Set, camelConfig);
        }


        let {homeInOnPath, observingRealm, sharingRealm} = camelConfig!;
        observingRealm =  observingRealm || 'parent';
        sharingRealm = sharingRealm || observingRealm;
        const canonicalConfig: CanonicalConfig = {
            homeInOnPath,
            observingRealm,
            sharingRealm,
            share: []
        };
        const {share} = canonicalConfig;
        const {Share, shareExpressions} = camelConfig!;
        if(Share !== undefined){
            const {tryParse} = await import('be-decorated/cpu.js');
            for(const key of Share){
                const spcqdp = tryParse(key, reSrcPropToCamelQryAsDomProp) as SrcPropCamelQryDomProp | null;
                if(spcqdp != null){
                    share.push({
                        props: [spcqdp.srcProp],
                        transform: {
                            [spcqdp.camelQry]: {[spcqdp.domProp]: spcqdp.srcProp}
                        } as any as Matches,
                    });
                    continue;
                }
                const spcq = tryParse(key, reSrcPropToCamelQry) as SrcPropCamelQry;
                if(spcq !== null){
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
        if(shareExpressions !== undefined){
            const {tryParse} = await import('be-decorated/cpu.js');
            for(const key in shareExpressions){
                const sp = tryParse(key, reSrcPropsTo) as SrcProps;
                if(sp !== null){
                    share.push({
                        props: sp.srcProps.split(reAndSplit),
                        transform: shareExpressions[key as DynamicShareKey] as any as Matches
                    })
                }
            }
        }

        return {
            canonicalConfig
        } as PPP;
    }

    async onCanonical(pp: PP, mold: Partial<PP>): Promise<PPP> {
        return mold;
    }
}

interface SrcProps {
    srcProps: string;
}

const reSrcPropsTo = /^(?<srcProps>[\w\\]+)(?<!\\)To/;

const reAndSplit = /(?<!\\)And/g;

const reSrcPropToCamelQry = /^(?<srcProp>[\w\\]+)(?<!\\)To(?<camelQry>\w+)/;

interface SrcPropCamelQry {
    srcProp: string,
    camelQry: string,
    
}

interface SrcPropCamelQryDomProp extends SrcPropCamelQry {
    domProp:string,
}
const reSrcPropToCamelQryAsDomProp = /^(?<srcProp>[\w\\]+)(?<!\\)To(?<camelQry>\w+)(?<!\\)As(?<domProp>\w+)/;

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

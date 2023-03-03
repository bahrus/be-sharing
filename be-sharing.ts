import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import { Matches, RenderContext } from 'trans-render/lib/types';
import {Actions, PP, Proxy, PPP, CanonicalConfig, DynamicShareKey, CamelConfig} from './types';

export class BeSharing extends EventTarget implements Actions{
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        let {scrutinize, observe, sharingRealm} = camelConfig!;
        observe =  observe || 'parent';
        sharingRealm = sharingRealm || observe;
        let homeInOnResolvedEventName: string | undefined = undefined;
        if(scrutinize !== undefined){
            const split = scrutinize.split('.');
            if(split.length > 1){
                const {camelToLisp} = await import('trans-render/lib/camelToLisp.js');
                //const camelSplit = [camelToLisp(split[0]), camelToLisp(split[1])]; // split.map(s => camelToLisp(s));
                let firstTokenCamel = camelToLisp(split[0]);
                if(firstTokenCamel.startsWith('be-')){
                    firstTokenCamel = firstTokenCamel.replace('be-', '');
                    const {lc} = await import('be-decorated/cpu.js');
                    scrutinize = '.beDecorated.' + lc(scrutinize.replace('be', ''));
                    homeInOnResolvedEventName = 'be-decorated.' + firstTokenCamel + '.resolved';
                }
                
            }
        }
        const canonicalConfig: CanonicalConfig = {
            scrutinize,
            homeInOnResolvedEventName,
            observe,
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
                    const {lc} = await import('be-decorated/cpu.js');
                    share.push({
                        props: sp.srcProps.split(reAndSplit).map(s => lc(s)),
                        transform: shareExpressions[key as DynamicShareKey] as any as Matches
                    })
                }
            }
        }

        return {
            canonicalConfig
        } as PPP;
    }

    #sharingRealmRef: WeakRef<DocumentFragment> | undefined;
    #observingRef: WeakRef<DocumentFragment> | undefined;
    async onCanonical(pp: PP, mold: Partial<PP>): Promise<PPP> {
        const {canonicalConfig, self} = pp;
        const {sharingRealm, observe, scrutinize, share} = canonicalConfig!;
        if(share === undefined || share.length === 0) return mold;
        let sharingRef: DocumentFragment | undefined;
        if(this.#sharingRealmRef !== undefined){
            sharingRef = this.#sharingRealmRef.deref();
        }
        if(sharingRef === undefined){
            const {findRealm} = await import('trans-render/lib/findRealm.js');
            sharingRef = await findRealm(self, sharingRealm) as DocumentFragment;
            this.#sharingRealmRef = new WeakRef(sharingRef);
        }
        let observingRef: DocumentFragment | undefined;
        if(observe === sharingRealm){
            observingRef = sharingRef;
        }else{
            if(this.#observingRef !== undefined){
                observingRef = this.#observingRef.deref();
            }
            if(observingRef === undefined){
                const {findRealm} = await import('trans-render/lib/findRealm.js');
                observingRef = await findRealm(self, observe) as DocumentFragment;
                this.#observingRef = new WeakRef(observingRef);
            }
        }
        let host = observingRef;
        if(scrutinize !== undefined){
            const {homeInOn} = await import('trans-render/lib/homeInOn.js');
            const {homeInOnResolvedEventName} = canonicalConfig!;
            host = await homeInOn(observingRef as any as Element, scrutinize, homeInOnResolvedEventName);
        }
        if(!(<any>host)._isPropagating){
            const {doBeHavings} = await import('trans-render/lib/doBeHavings.js');
            import('be-propagating/be-propagating.js');
            await doBeHavings(host as any as Element, [{
                be: 'propagating',
                waitForResolved: true,
            }]);
        }
        const {DTR} = await import('trans-render/lib/DTR.js');
        for(const shareInstance of share){
            const {transform, props} = shareInstance;
            const ctx: RenderContext = {
                host,
                match: transform,
            };
            const dtr = new DTR(ctx);
            await dtr.transform(sharingRef);
            for(const prop of props){
                host.addEventListener(prop, e=> {
                    dtr.transform(sharingRef!);
                });
            }
        }
        return mold;
    }
}

interface SrcProps {
    srcProps: string;
}

const reSrcPropsTo = /^(?<srcProps>[\w\\]+)(?<!\\)To/;

const reAndSplit = /(?<!\\)And/g;

const reSrcPropToCamelQry = /^(?<srcProp>[\w\\]+)(?<!\\)To(?<camelQry>\w+)/;

//const reIsBe = /^be(?<)

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

define<Proxy & BeDecoratedProps<Proxy, Actions, CamelConfig>, Actions>({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: [upgrade],
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

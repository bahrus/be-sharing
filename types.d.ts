import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {camelQry, Scope, Matches, Transformer} from 'trans-render/lib/types';

export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLScriptElement>{
    canonicalConfig?: CanonicalConfig;
}

export type observingRealm = string;

export type homeInOnPath = string;

export type sharingRealm = string;

export type propName = string;

export type SetStatement = 
    |   `ObservingRealmTo${observingRealm}` 
    |   `HomeInOnPathTo${homeInOnPath}`
    |   `SharingRealmTo${sharingRealm}`;

export type ShareStatement = 
    | `${string}To${camelQry}As${string}`
    | `${string}To${camelQry}`;

export type DynamicShareKey = `share${propName}To`
export interface ShareTransform {
    props: string[],
    transform: Matches,
    transformer?: Transformer,
}
export interface CamelConfig {
    Set?: SetStatement[],
    Share?: ShareStatement[],
    share?: ShareTransform | ShareTransform[],
    Observe?: [Scope],
    Scrutinize?: [string],
    observe?: Scope,
    //homeInOnPath?: string,
    scrutinize?: string,
    sharingRealm?: Scope,
    shareExpressions?: {
        [key: DynamicShareKey]: Matches,
    }
}

export interface CanonicalConfig{
    observe: Scope,
    //homeInOnPath?: string,
    scrutinize?: string,
    homeInOnResolvedEventName?: string,
    sharingRealm: Scope,
    share: ShareTransform[],
}

export type Proxy = HTMLScriptElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy
}

export type PPP = Partial<PP>;

export interface Actions{
    camelToCanonical(pp: PP): Promise<PPP>;
    onCanonical(pp: PP, mold: PPP): Promise<PPP>;
}


import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {AffectOptions, JSONObject, camelQry, Scope, QueryInfo} from 'trans-render/lib/types';

export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export type observingRealm = string;

export type homeInOnPath = string;

export type sharingRealm = string;

export type SetStatement = 
    |   `ObservingRealmTo${observingRealm}` 
    |   `HomeInOnPathTo${homeInOnPath}`
    |   `SharingRealmTo${sharingRealm}`;

export interface CamelConfig {
    Set: SetStatement[],
    Share?: `${string}To${camelQry}As${string}`[]
}


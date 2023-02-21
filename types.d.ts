import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {AffectOptions, JSONObject, camelQry, Scope, QueryInfo} from 'trans-render/lib/types';

export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export interface CamelConfig {
    observe?: AffectOptions; //TODO:  ObserveOptions?
    Share?: `${string}To${camelQry}As${string}`[]
}


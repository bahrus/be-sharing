import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE, Declarations} from 'be-enhanced/types';
import {SharingCamelConfig, CanonicalConfig} from '../be-linked/types';

export interface EndUserProps extends IBE<HTMLTemplateElement | HTMLScriptElement> {
    camelConfig?: SharingCamelConfig | SharingCamelConfig[],
}

export interface AllProps extends EndUserProps {
    canonicalConfig?: CanonicalConfig;
}



export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    camelToCanonical(self: this): ProPAP;
    onCanonical(self: this): ProPAP;
}


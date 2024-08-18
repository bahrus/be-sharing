// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import { MountObserver } from 'mount-observer/MountObserver.js';
import { emc } from 'be-gingerly/behivior.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/be-sharing/types.d.ts' */;
/** @import {EnhancementInfo} from './ts-refs/trans-render/be/types.d.ts' */

/**
 * @implements {Actions}
 * 
 */
class BeSharing extends BE {
    /**
     * @type {BEConfig<AP & BEAllProps, Actions & IEnhancement, any>}
     */
    static config = {
        propDefaults: {

        },
        propInfo:  {
            ...propInfo,
        },
        positractions: [resolved, rejected],
    }

    /**
     * 
     * @param {Element} enhancedElement 
     * @param {EnhancementInfo} enhancementInfo
     * @override 
     */
    async attach(enhancedElement, enhancementInfo) {
        super.attach(enhancedElement, enhancementInfo);
        debugger;
        const beGingerly = await
        /** @type {any} */ 
        (enhancedElement).beEnhanced.whenResolved(emc);
        const mo = new MountObserver({
            on: '[itemscope*="-"] [itemprop]',
            do: {

            }
        });
    }

}

await BeSharing.bootUp();
export { BeSharing };
import {shortTitle} from '../../configs/general';
import { logger, breadcrumb} from '../../configs/log';

export default function addDeckDeleteError(context, payload, done) {
    logger.info({reqId: payload.navigate.reqId, navStack: context.stack});
    context.dispatch('DELETE_ERROR', payload);
    done();
}

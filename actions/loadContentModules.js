import async from 'async';
// import { shortTitle } from '../configs/general';
// import loadContentDiscussion from './contentdiscussion/loadContentDiscussion';
import loadDataSources from './datasource/loadDataSources';
import loadCommentsCount from './contentdiscussion/loadCommentsCount';
import loadPlaylistsCount from './collections/loadPlaylistsCount';
import deckContentTypeError from './error/deckContentTypeError';
import slideIdTypeError from './error/slideIdTypeError';
import { AllowedPattern } from './error/util/allowedPattern';
import serviceUnavailable from './error/serviceUnavailable';
const log = require('./log/clog');


export default function loadContentModules(context, payload, done) {
    log.info(context);
    if (!(['deck', 'slide'].indexOf(payload.params.stype) > -1 || payload.params.stype === undefined)){
        context.executeAction(deckContentTypeError, payload, done);
        return;
    }

    if (!(AllowedPattern.SLIDE_ID.test(payload.params.sid) || payload.params.sid === undefined)) {
        context.executeAction(slideIdTypeError, payload, done);
        return;
    }

        //load all required actions in parallel
    let actions = [
        // (callback) => {
        //     context.executeAction(loadContentDiscussion, payload, callback);
        // },
        // (callback) => {
        //     context.executeAction(loadDataSourceCount, payload, callback);
        // },

        (callback) => {
            context.executeAction(loadCommentsCount, payload, callback);
        },
        (callback) => {
            context.executeAction(loadPlaylistsCount, payload, callback);
        }
    ];

    if (payload.params.stype !== 'slide') {
        // explicitly load the data sources if it's a deck
        // if it's a slide the panel will be updated via the loadContent action
        actions.push((callback) => {
            context.executeAction(loadDataSources, payload, callback);
        });
    }

    async.parallel(actions, (err, results) => {
        // final callback
        if (err){
            log.error(context, {filepath: __filename});
            context.executeAction(serviceUnavailable, payload, done);
        }
        context.dispatch('LOAD_CONTENT_MODULES_SUCCESS', {selector: payload.params, moduleType: 'datasource'});
        // let pageTitle = shortTitle + ' | Activities | ' + payload.params.stype + ' | ' + payload.params.sid;
        // context.dispatch('UPDATE_PAGE_TITLE', {
        //     pageTitle: pageTitle
        // });
        done();
    });
}

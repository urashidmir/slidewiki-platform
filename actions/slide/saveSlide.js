import UserProfileStore from '../../stores/UserProfileStore';
import {shortTitle} from '../../configs/general';
import striptags from 'striptags';
import TreeUtil from '../../components/Deck/TreePanel/util/TreeUtil';
const log = require('../log/clog');
import addActivity from '../activityfeed/addActivity';
import {navigateAction} from 'fluxible-router';
import { isEmpty } from '../../common.js';
import Util from '../../components/common/Util';

export default function saveSlide(context, payload, done) {
    log.info(context);
    console.log('!!! action saveSlide with payload', payload);

    //enrich with user id
    let userid = context.getStore(UserProfileStore).userid;

    //enrich with root deck id if deck to be revised is not uppermost deck
    let parent = TreeUtil.getParentId(payload.selector);
    payload.root_deck = parent;


    if (userid != null && userid !== '') {
        //enrich with jwt
        payload.jwt = context.getStore(UserProfileStore).jwt;
        context.service.update('slide.content', payload, {timeout: 20 * 1000}, (err, res) => {
            if (err) {
                context.dispatch('SAVE_SLIDE_EDIT_FAILURE', err);
            } else {
                context.dispatch('SAVE_SLIDE_EDIT_SUCCESS', res);
                context.dispatch('UPDATE_TREE_NODE_SUCCESS', {
                    selector: payload.selector,
                    nodeSpec: {title: striptags(payload.title), id: res.slide.id, path: res.slide.path, theme: res.slide.theme}
                });

                //update the URL: redirect to view after edit
                let newURL = Util.makeNodeURL({
                    id: payload.selector.id,
                    stype: payload.selector.stype,
                    sid: res.slide.id,
                    spath: res.slide.path
                }, 'deck', 'view');
                context.executeAction(navigateAction, {
                    url: newURL
                });

                //add new activity
                let activity = {
                    activity_type: 'edit',
                    user_id: String(context.getStore(UserProfileStore).userid),
                    content_id: String(res.slide.id),
                    content_kind: 'slide'
                };
                let parentId = payload.selector.id;
                let topParentId = payload.selector.id;
                let tmp = res.slide.path.split(';');
                if (tmp.length > 1) {
                    parentId = tmp[tmp.length - 2];
                    tmp = parentId.split(':');
                    parentId = tmp[0];
                }
                if (!isEmpty(parentId)) {
                    activity.parent_content_id = parentId;
                    activity.top_parent_content_id = topParentId;
                }
                context.executeAction(addActivity, {activity: activity});
            }

            //let pageTitle = shortTitle + ' | Slide Edit | ' + payload.params.sid;
            //let pageTitle = shortTitle + ' | Slide Edit | ';
            //context.dispatch('UPDATE_PAGE_TITLE', {
            //    pageTitle: pageTitle
            //});
            done();
        });
    }
    else
        done();
}

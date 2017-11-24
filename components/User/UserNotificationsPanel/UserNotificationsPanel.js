import React from 'react';
import {connectToStores} from 'fluxible-addons-react';
import {navigateAction} from 'fluxible-router';
import UserNotificationsStore from '../../../stores/UserNotificationsStore';
import UserProfileStore from '../../../stores/UserProfileStore';
import UserNotificationsList from './UserNotificationsList';
import updateUserNotificationsVisibility from '../../../actions/user/notifications/updateUserNotificationsVisibility';
import markAsReadUserNotifications from '../../../actions/user/notifications/markAsReadUserNotifications';
import deleteAllUserNotifications from '../../../actions/user/notifications/deleteAllUserNotifications';
import loadUserNotifications from '../../../actions/user/notifications/loadUserNotifications';
import selectAllActivityTypes from '../../../actions/user/notifications/selectAllActivityTypes';

class UserNotificationsPanel extends React.Component {

    componentWillMount() {
        if ((String(this.props.UserProfileStore.userid) === '')) {//the user is not loggedin
            this.context.executeAction(navigateAction, {
                url: '/'
            });
        } else {
            this.context.executeAction(loadUserNotifications, { uid: this.props.UserProfileStore.userid });
        }
    }

    handleChangeToggle(type, id) {
        this.context.executeAction(updateUserNotificationsVisibility, {
            changedType: type,
            changedId: id
        });
        //set value of selectAll
        let value = true;
        this.props.UserNotificationsStore.activityTypes.forEach((at) => {if (! $('#' + at.type).prop('checked')) value = false;});
        $('#all').prop('checked', value);
    }

    handleChangeAll() {
        let value = $('#all').prop('checked');
        this.props.UserNotificationsStore.activityTypes.forEach((at) => {$('#' + at.type).prop('checked', value);});
        this.context.executeAction(selectAllActivityTypes, {
            value: value
        });
    }

    handleMarkAsRead() {
        this.context.executeAction(markAsReadUserNotifications, {
            uid: this.props.UserProfileStore.userid
        });
    }

    handleDelete() {
        swal({
            title: 'Delete all notifications. Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!'
        }).then((accepted) => {
            this.context.executeAction(deleteAllUserNotifications, {
                uid: this.props.UserProfileStore.userid
            });
        }, (reason) => {/*do nothing*/}).catch(swal.noop);
    }

    render() {
        if (String(this.props.UserProfileStore.userid) === '') {//user is not loggedin
            return null;
        }

        const activityTypeList = this.props.UserNotificationsStore.activityTypes.map((at, index) => {

            const labelName = (at.type === 'react') ? 'Like' : at.type;
            const label = labelName.charAt(0).toUpperCase() + labelName.slice(1);
            return (
                <div className="ui item toggle checkbox" key={index} role="listitem" tabIndex="0">
                    <input name={at.type} id={at.type} type="checkbox" defaultChecked={at.selected} onChange={this.handleChangeToggle.bind(this, at.type, 0)} />
                    <label>{label}</label>
                </div>
            );
        });

        const notifications = this.props.UserNotificationsStore.notifications;
        const notificationsCount = this.props.UserNotificationsStore.notifications ? this.props.UserNotificationsStore.notifications.length : 0;
        const newNotificationsCount = this.props.UserNotificationsStore.newNotificationsCount;
        const selector = this.props.UserNotificationsStore.selector;

        const iconMarkAsReadTitle = (newNotificationsCount > 0) ? 'Mark all ' + newNotificationsCount + ' new notifications as read' : 'Mark all as read';
        let iconMarkAsRead = (//disabled icon
            <a className="item" title={iconMarkAsReadTitle}>
                <i tabIndex="0" className="ui large disabled checkmark box icon"></i>
            </a>
        );
        const iconDeleteAllTitle = (newNotificationsCount > 0) ? 'Delete all ' + newNotificationsCount + ' notifications' : 'Delete all';
        let iconDeleteAll = (//disabled icon
            <a className="item" title={iconDeleteAllTitle}>
                <i tabIndex="0" className="ui large disabled remove circle outline icon"></i>
            </a>
        );
        if(newNotificationsCount > 0) {//if there are new notifications -> enable it
            iconMarkAsRead = (
                <a className="item" onClick={this.handleMarkAsRead.bind(this)} title={iconMarkAsReadTitle} >
                    <i tabIndex="0" className="ui large checkmark box icon"></i>
                </a>
            );
        };
        if(notificationsCount > 0) {//if there are notifications -> enable it
            iconDeleteAll = (
                <a className="item" onClick={this.handleDelete.bind(this)} title={iconDeleteAllTitle}>
                    <i tabIndex="0" className="ui large remove circle outline icon"></i>
                </a>
            );
        };

        const filters = (
            <div className="five wide column">
                <div className="ui basic segment">

                    <h4 className="ui header">Show activity types:</h4>
                    <div className="activityTypes">
                        <div ref="activityTypeList">
                            <div className="ui relaxed list" role="list" >
                                <div className="ui toggle checkbox">
                                    <input name="all" id="all" type="checkbox" defaultChecked={true} onChange={this.handleChangeAll.bind(this)}/>
                                    <label>Select all</label>
                                </div>
                                <div className="ui hidden divider" />
                                {activityTypeList}
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        );

        let loadingDiv = <div className="ui basic segment">
            <div className="ui active text loader">Loading</div>
        </div>;
        let emptyDiv = <div className="ui grid centered">
            <h3>There are currently no notifications.</h3>
        </div>;

        let notificationsDiv='';
        if(this.props.UserNotificationsStore.loading){
            notificationsDiv = loadingDiv;
        } else if (notifications.length === 0) {
            notificationsDiv = emptyDiv;
        } else {
            notificationsDiv = <UserNotificationsList username={this.props.UserProfileStore.username} items={notifications} selector={selector} />;
        }
        return (
            <div ref="userNotificationsPanel">
                <div className="ui hidden divider" />
                <div className="ui container stackable two columm grid">
                    <div className="six wide column">
                      <div className="ui huge header">
                          Notifications <div className="ui mini label" >{iconDeleteAll} {iconMarkAsRead} {newNotificationsCount} </div>
                      </div>
                      <div className="ui basic segment">
                          {filters}
                      </div>
                    </div>
                    <div className="column ten wide">
                        <div className="ui basic segment">
                            {notificationsDiv}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UserNotificationsPanel.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};
UserNotificationsPanel = connectToStores(UserNotificationsPanel, [UserNotificationsStore, UserProfileStore], (context, props) => {
    return {
        UserNotificationsStore: context.getStore(UserNotificationsStore).getState(),
        UserProfileStore: context.getStore(UserProfileStore).getState()
    };
});
export default UserNotificationsPanel;

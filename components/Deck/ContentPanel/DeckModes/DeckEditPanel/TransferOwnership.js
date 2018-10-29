import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';
import {Button, Icon, Modal, Header, TextArea, Segment, Container, Menu} from 'semantic-ui-react';
import { FormattedMessage, defineMessages } from 'react-intl';
import UserPicture from '../../../../common/UserPicture';
import hideTransferOwnershipModal from '../../../../../actions/deckedit/hideTransferOwnershipModal';
import transferOwnership from '../../../../../actions/deckedit/transferOwnership';

class TransferOwnership extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.unmountTrap = this.unmountTrap.bind(this);

        this.messages = defineMessages({
            modalHeading: {
                id: 'TransferOwnership.modalHeading',
                defaultMessage: 'Transfer Ownership'
            },
            close: {
                id: 'TransferOwnership.close',
                defaultMessage: 'Close'
            },
            unknownCountry: {
                id: 'TransferOwnership.unknownCountry',
                defaultMessage: 'unknown country'
            },
            unknownOrganization: {
                id: 'TransferOwnership.unknownOrganization',
                defaultMessage: 'Unknown organization'
            },
            linkHint: {
                id: 'TransferOwnership.linkHint',
                defaultMessage: 'The username is a link which will open a new browser tab. Close it when you want to go back to this page.'
            },
            continue: {
                id: 'TransferOwnership.continue',
                defaultMessage: 'Transfer ownership'
            }
        });

        this.state = {
            selectedUser: ''
        };
    }

    handleClose() {
	      $('#app').attr('aria-hidden','false');
	      this.context.executeAction(hideTransferOwnershipModal, {});
    }

    unmountTrap() {
        this.handleClose();
    }

    handleContinue() {
        $('#app').attr('aria-hidden','false');
        this.context.executeAction(transferOwnership, {deckid: this.props.deckid, userid: this.state.selectedUser});
    }

    render() {
        let editors = [];

        if (this.props.users !== undefined && this.props.users.length > 0) {
            this.props.users.forEach((user) => {
                const optionalText = (user.organization || user.country) ?
                    (user.organization || this.context.intl.formatMessage(this.messages.unknownOrganization)) + ', ' + (user.country || this.context.intl.formatMessage(this.messages.unknownCountry)) :
                    '';
                editors.push(
                  (
                    <Menu.Item name={'item_' + user.username} key={user.id || user.userid} active={this.state.selectedUser === (user.id || user.userid)} onClick={() => {console.log('onItemClicked'); this.setState({selectedUser: user.id || user.userid});}}>
                      <div className="ui grid">
                        <div className="two wide column">
                          <UserPicture picture={ user.picture } username={ user.username } avatar={ true } width= { 30 } size="tiny" />
                        </div>
                        <div className="fourten wide column">
                          <TextArea className="sr-only" id={'usernameIsALinkHint' + (user.id || user.userid)} value={this.context.intl.formatMessage(this.messages.linkHint)} tabIndex ='-1'/>
                          <a className="header" href={'/user/' + user.username} target="_blank">{user.displayName || user.username}</a>
                          <br/>
                          {optionalText}
                        </div>
                      </div>
                    </Menu.Item>
                  )
                );
            });
        }

        let showModal = this.props.show;

        return (
          <Modal dimmer='blurring'
            ref="modal1"
            role='dialog'
            aria-labelledby='transferownershipmodal_header'
						aria-describedby='transferownershipmodal_content'
            open={showModal}
            tabIndex="0" >
              <FocusTrap focusTrapOptions={{
                  clickOutsideDeactivates: true,
                  onDeactivate: this.unmountTrap,
                  initialFocus:'#transferownershipmodal_content'
              }}
                active={showModal}
                id="focusTrapGroupDetailsModal"
                className="header">
								<Modal.Header as="h1" content={this.context.intl.formatMessage(this.messages.modalHeading)} id='transferownershipmodal_header'/>
								<Modal.Content id='transferownershipmodal_content' tabIndex="0">
                  <Container>
                    <Segment color="blue" textAlign="center" padded>
                      <Segment attached="bottom" textAlign="left">
      									<h3 className="header" ></h3>
      									<p>There are {this.props.users.length} users which have edit rights to the deck. Select one to transfer the ownership as precondition for deleting the deck.</p>
      									<Menu size='small' vertical style={{width: "100%"}}>
      											{editors}
      									</Menu>
                      </Segment>
                      <Modal.Actions>
  											<Button onClick={ this.handleContinue.bind(this) } role="button" tabIndex="0" aria-label={this.context.intl.formatMessage(this.messages.continue)} disabled={this.state.selectedUser === ''} positive>
  													{this.context.intl.formatMessage(this.messages.continue)}
  											</Button>
                        <Button onClick={ this.handleClose } role="button" tabIndex="0" aria-label={this.context.intl.formatMessage(this.messages.close)}>
  													{this.context.intl.formatMessage(this.messages.close)}
  											</Button>
      								</Modal.Actions>
                    </Segment>
                  </Container>
								</Modal.Content>

              </FocusTrap>
						</Modal>
        );

        window.scrollTo(0, 0);
    }
}

TransferOwnership.contextTypes = {
    executeAction: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired
};

export default TransferOwnership;

import React from 'react';
import {connectToStores} from 'fluxible-addons-react';
import ContributorsStore from '../../../stores/ContributorsStore';
import ContributorsList from './ContributorsList';

class ContributorsPanel extends React.Component {
    render() {
        return (
            <div className="sw-contributors-panel" ref="contributorsPanel">

                <div className="ui segments">
                    <div className="ui secondary segment">
                        <a href="/contributors/deck/57">Contributors</a>
                    </div>
                    <div className="ui black segment">
                        <ContributorsList items={this.props.ContributorsStore.contributors} />
                    </div>
                </div>

             </div>
        );
    }
}
ContributorsPanel = connectToStores(ContributorsPanel, [ContributorsStore], (context, props)=> {
    return {
        ContributorsStore: context.getStore(ContributorsStore).getState()
    };
});
export default ContributorsPanel;

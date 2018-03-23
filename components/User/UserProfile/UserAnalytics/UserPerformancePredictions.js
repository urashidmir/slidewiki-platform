import React from 'react';
import UserPerformancePredictionItem from './UserPerformancePredictionItem';
import { connectToStores } from 'fluxible-addons-react';
import UserPerformancePredictionsStore from '../../../../stores/UserPerformancePredictionsStore';
import UserProfileStore from '../../../../stores/UserProfileStore';
import SelectDeckModal from './SelectDeckModal';

class UserPerformancePredictions extends React.Component {

    componentDidMount() {
        this.enableAccordion();
    }

    componentDidUpdate() {
        this.refreshAccordion();
    }

    enableAccordion(status) {
        let accordionDIV = this.refs.predictionsList;
        $(accordionDIV).find('.ui.accordion').accordion({
            exclusive: false
        });
    }

    refreshAccordion(status) {
        let accordionDIV = this.refs.predictionsList;
        $(accordionDIV).find('.ui.accordion').accordion('refresh');
    }

    render() {
        const items = this.props.UserPerformancePredictionsStore.predictions ?  ((this.props.UserPerformancePredictionsStore.predictions.length > 0) ? this.props.UserPerformancePredictionsStore.predictions.map((prediction, index) => {
            return (
                <UserPerformancePredictionItem prediction={prediction} key={index} />
            );
        }) : 'There are no predictions') : '';
        const loading = (this.props.UserPerformancePredictionsStore.loading) ? <div className="ui active dimmer"><div className="ui text loader">Loading</div></div> : '';
        return (
            <div className="ui segments">
                <div className="ui secondary clearing segment" >
                  <h3 className="ui left floated header" >Performance predictions</h3>
                  <SelectDeckModal />
              </div>

              {loading}

              <div className="ui vertical segment" ref="predictionsList">
                  <div className="ui styled fluid accordion">
                      {items}
                  </div>
              </div>
            </div>
        );
    }
}

UserPerformancePredictions.contextTypes = {
    executeAction: React.PropTypes.func.isRequired
};

UserPerformancePredictions = connectToStores(UserPerformancePredictions, [UserPerformancePredictionsStore, UserProfileStore], (context, props) => {
    return {
        UserPerformancePredictionsStore: context.getStore(UserPerformancePredictionsStore).getState(),
        UserProfileStore: context.getStore(UserProfileStore).getState()
    };
});

export default UserPerformancePredictions;

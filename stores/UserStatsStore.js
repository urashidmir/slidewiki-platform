import {BaseStore} from 'fluxible/addons';

class UserStatsStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.datePeriod = 'LAST_7_DAYS';
        this.activitiesByTime = [];
        this.activitiesByCategory = [];
        this.chartHeight = 450;
    }

    updateActivityStatsByTime(payload) {
        this.activitiesByTime = payload.activitiesByTime;
        this.emitChange();
    }

    updateDatePeriod(payload) {
        this.datePeriod = payload.datePeriod;
        this.emitChange();
    }

    updateActivityStatsByCategory(payload) {
        this.activitiesByCategory = payload.activitiesByCategory;
        this.emitChange();
    }

    getState() {
        return {
            datePeriod: this.datePeriod,
            activitiesByTime: this.activitiesByTime,
            activitiesByCategory: this.activitiesByCategory,
            chartHeight: this.chartHeight
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.datePeriod = state.datePeriod;
        this.activitiesByTime = state.activitiesByTime;
        this.activitiesByCategory = state.activitiesByCategory;
        this.chartHeight = state.chartHeight;
    }
}

UserStatsStore.storeName = 'UserStatsStore';
UserStatsStore.handlers = {
    'UPDATE_USER_STATS_PERIOD': 'updateDatePeriod',
    'LOAD_ACTIVITY_STATS_BY_TIME': 'updateActivityStatsByTime',
    'LOAD_ACTIVITY_STATS_BY_CATEGORY': 'updateActivityStatsByCategory'

};

export default UserStatsStore;

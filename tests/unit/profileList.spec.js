import { createLocalVue } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import ProfileList from "../../src/components/profile/ProfileList";
import wrapperFactory from '../service/wrapperFactory';
import profileListMock from './../__mocks__/profileListMock';
import Vuex from 'vuex';
import { cloneDeep } from "lodash";
const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.directive('intersection', () => null);


describe('SearchForm.vue', () => {
  let wrapper, mocks, store, actions;

  mocks = profileListMock();
  actions = mocks.actions;
  let propsData = {
    list: [{
      "adult": false,
      "backdrop_path": "/2k9tBql5GYH328Krj66tDT9LtFZ.jpg",
      "genre_ids": [12, 18, 27],
      "id": 760741,
      "overview": "",
      "popularity": 4257.378,
      "poster_path": "/iRV0IB5xQeOymuGGUBarTecQVAl.jpg",
      "release_date": "2022-08-11",
      "title": "Beast",
      "vote_average": 7.116,
      "vote_count": 450,
    }],
    type: "watchlist",
  };
  beforeEach(() => {

    store = new Vuex.Store(cloneDeep({
      actions,
    }));

  });
  it("dispatches setUserWatchlist", () => {
    wrapper = wrapperFactory(ProfileList, {}, localVue, store, mocks, propsData);
    expect(wrapper.vm.type).toEqual("watchlist");
    expect(wrapper.vm.list).toEqual(propsData.list);
    expect(actions.setUserWatchlist).toHaveBeenCalled();
  });

});
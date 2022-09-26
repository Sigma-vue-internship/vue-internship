import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import homeViewMock from '../__mocks__/homeViewMock';
import HomeView from "../../src/views/HomeView";
const localVue = createLocalVue();

localVue.use(Vuex);

describe('HomeView.vue', () => {
  let wrapper, store, mocks;
  beforeEach(() => {
    mocks = homeViewMock();
    store = new Vuex.Store({
      getters: mocks.getters,
      actions: mocks.actions,
    });
  });
  it('should call findMedia function after input', async() => {
    wrapper = shallowMount(HomeView, { store, localVue });
    expect(wrapper.vm.celebrities).toEqual([]);
  });
});
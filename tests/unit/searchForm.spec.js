import { createLocalVue } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import Notifications from "vue-notification";
import SearchForm from "../../src/components/common/SearchForm";
import wrapperFactory from '../service/wrapperFactory';
import searchFormMock from './../__mocks__/searchFormMock';

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(Notifications);

describe('SearchForm.vue', () => {
  let wrapper, mocks;
  let componentData = {
    searchQuery:"123",
  };
  let searchData = {
    "searchBy": null,
    "searchByValue": null,
    "searchQuery":"123",
  };
  let stub = jest.fn();
  mocks = searchFormMock();

  it("emits findMedia on searchQuery input", async() => {
    wrapper = wrapperFactory(SearchForm, componentData, localVue, {}, mocks);
    wrapper.vm.$on("findMedia", stub);
    await wrapper.find(".search-btn").trigger("click");
    expect(stub).toBeCalledWith(searchData);
  });
});
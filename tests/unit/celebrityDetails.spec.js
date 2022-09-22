import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import CelebrityDetailsView from "@/views/CelebrityDetailsView.vue";
import { BootstrapVue } from 'bootstrap-vue';
import celebrityDetailsMock from '../__mocks__/celebrityDetailsMock';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("CelebrityDetailsView.vue", () => {
  let actions;
  let store;
  let mocks;
  let spyMethod;
  const $route = {
    path: '/some/path',
    params: {
      id:1,
    },
  };
  beforeEach(() => {
    mocks = celebrityDetailsMock();
    actions = mocks.actions;
    store = new Vuex.Store({
      actions,
    });
  });
  it("on created hook getCelebrityData called", async() => {
    spyMethod = jest.spyOn(CelebrityDetailsView.methods, "getCelebrityData");
    shallowMount(CelebrityDetailsView, {
      localVue,
      store,
      data() {
        return {
          celebrity: {
            also_known_as: ["Idrissa Akuna Elba ", "إدريس إلبا", "Идрис Эльба", "伊德瑞斯·艾尔巴", "イドリス・エルバ",
              "이드리스 엘바", "Idrissa Akuna \"Idris\" Elba", "Ίντρις Έλμπα", "Ідріс Ельба"],
          },
          celebrityMovies: ["1"],
        };
      },
      computed: mocks.computed,
      mocks: {
        $route,
      },
    });
    expect(spyMethod).toBeCalled();
    spyMethod.mockReset;
  });
  it("on created hook celebrityData should be loaded", async() => {
    const wrapper = shallowMount(CelebrityDetailsView, {
      localVue,
      store,
      data() {
        return {
          celebrity: {
            also_known_as: ["Idrissa Akuna Elba ", "إدريس إلبا", "Идрис Эльба", "伊德瑞斯·艾尔巴", "イドリス・エルバ",
              "이드리스 엘바", "Idrissa Akuna \"Idris\" Elba", "Ίντρις Έλμπα", "Ідріс Ельба"],
          },
        };
      },
      computed: mocks.computed,
      mocks: {
        $route,
      },

    });
    expect(actions.findSingleCelebrity).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.celebrity).toEqual(123);

    expect(actions.getCelebrityImages).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.resImagesData).toEqual(123);

    expect(actions.getCelebrityMovies).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.celebrityMovies).toEqual([1,2,3]);

  });
});

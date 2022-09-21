import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import CelebrityDetailsView from "@/views/CelebrityDetailsView.vue";
import { BootstrapVue } from 'bootstrap-vue';


const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("CelebrityDetailsView.vue", () => {
  let actions;
  let store;
  const $route = {
    path: '/some/path',
    params: {
      id:1,
    },
  };
  let findSingleCelebrity = jest.fn(()=>Promise.resolve({ data:123 }));
  let getCelebrityImages = jest.fn(()=>Promise.resolve(123));
  let getCelebrityMovies = jest.fn(() => Promise.resolve({ data: { cast: [1,2,3] } }));
  beforeEach(() => {
    actions = {
      findSingleCelebrity,
      getCelebrityImages,
      getCelebrityMovies,
    };
    store = new Vuex.Store({
      actions,
    });
  });
  it("on created hook getCelebrityData called", async() => {
    const mockMethod = jest.fn();
    shallowMount(CelebrityDetailsView, {
      localVue,
      store,
      data() {
        return {
          celebrityMovies: ["1"],
        };
      },
      methods: {
        getCelebrityData:mockMethod,
      },
      computed: {
        profilePath() { return "test_profile_path"; },
        celebrityRating() { return 1; },
      },
    });
    expect(mockMethod).toBeCalled();

  });
  it("on created hook celebrityData should be loaded", async() => {
    const wrapper = shallowMount(CelebrityDetailsView, {
      localVue,
      store,
      computed: {
        profilePath() { return "test_profile_path"; },
        celebrityRating() { return 1; },
      },
      mocks: {
        $route,
      },

    });
    expect(findSingleCelebrity).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.celebrity).toEqual(123);
    expect(getCelebrityImages).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.resImagesData).toEqual(123);
    expect(getCelebrityMovies).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.celebrityMovies).toEqual([1,2,3]);

  });
});

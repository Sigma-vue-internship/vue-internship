import { shallowMount,mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import HomeView from '@/views/HomeView.vue';
import SingleMoviePage from '@/components/movie/SingleMoviePage.vue';
const localVue = createLocalVue();

localVue.use(Vuex);


describe('HomeView.vue', () => {
  let wrapper, store, actions;

  beforeEach(() => {
    const cashedMovies = jest.fn();
    const cashedCelebrities = jest.fn();
    cashedMovies.mockReturnValue([]);
    cashedCelebrities.mockReturnValue([]);
    actions = {
      changeMediaPage: jest.fn(),
      getMovies: jest.fn(),
      getActors: jest.fn(),
    };
    store = new Vuex.Store({
      getters: {
        cashedMovies,
        cashedCelebrities,
      },
      actions,
    });
  });
  it('should call findMedia function after input', async() => {
    wrapper = shallowMount(HomeView, { store, localVue });
    expect(wrapper.vm.celebrities).toEqual([]);
    // const input = wrapper.find('input');
    // input.element.value = 'input';
    // input.trigger('input');
  });
});
describe('SingleMoviePage.vue', () => {
  it('should call toMovieHomepage function after button click', async() => {
    const wrapper = shallowMount(SingleMoviePage, {
      propsData: {
        movie: {
          poster_path: "/vwq5iboxYoaSpOmEQrhq9tHicq7.jpg",
        },
      },
    });
    const toMovieHomepage = jest.fn();

    wrapper.setMethods({
      toMovieHomepage,
    });

    wrapper.find('.movie__homepage-btn').trigger('click');
    expect(toMovieHomepage).toHaveBeenCalled();
  });
});

export default function homeViewMock() {

  const cashedMovies = jest.fn();
  const cashedCelebrities = jest.fn();

  cashedMovies.mockReturnValue([]);
  cashedCelebrities.mockReturnValue([]);

  const getters = {
    cashedMovies,
    cashedCelebrities,
  };

  const actions = {
    changeMediaPage: jest.fn(),
    getMovies: jest.fn(),
    getActors: jest.fn(),
  };

  const mocks = {
    getters,
    actions,
  };

  return mocks;
}
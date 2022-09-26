export default function profileListMock() {
  const actions = {
    setUserWatchlist: jest.fn(),
    setUserFavoritelist: jest.fn(),
  };
  const mocks = {
    actions,
  };
  return mocks;
}
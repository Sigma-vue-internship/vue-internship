export default function celebrityDetailsMock() {
  let findSingleCelebrity = jest.fn(()=>Promise.resolve({ data:123 }));
  let getCelebrityImages = jest.fn(()=>Promise.resolve(123));
  let getCelebrityMovies = jest.fn(() => Promise.resolve({ data: { cast: [1, 2, 3] } }));
  const actions = {
    findSingleCelebrity,
    getCelebrityImages,
    getCelebrityMovies,
  };
  const computed = {
    profilePath() { return "test_profile_path"; },
    celebrityRating() { return 1; },
    celebrityImages() { return true; },
  };
  const mocks = {
    actions,
    computed,

  };
  return mocks;
}
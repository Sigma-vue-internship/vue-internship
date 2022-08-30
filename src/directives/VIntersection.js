export default {
  bind(el, binding) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const lazyLoadingObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    }, options);
    lazyLoadingObserver.observe(el);
  },
  name: "intersection",
};

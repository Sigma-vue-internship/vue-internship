import { shallowMount } from "@vue/test-utils";
export default function wrapperFactory( component, data, localVue, store={}, mocks = {
  computed: "comp",
  $route: "/route",
}, propsData) {
  return shallowMount(component, {
    propsData,
    localVue,
    store,
    data() {
      return data;
    },
    computed:mocks.computed,
    mocks: {
      ...spreadGlobals(mocks),
    },
  });
}

const spreadGlobals = mocks => {
  const mocksKeys = Object.keys(mocks).filter(k => k.includes("$"));
  const mockEntries = Object.entries(mocks).filter((mock) => mock[0] === mocksKeys[0]);
  return Object.fromEntries(mockEntries);
};

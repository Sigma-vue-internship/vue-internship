export default {
  data() {
    return {
      error: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    formValidation(formData) {
      if (!formData.label.length)
        return (this.error.title = "Please write a title");

      if (!formData.description.length)
        return (this.error.description = "Please write a description");

      this.error.title = "";
      this.error.description = "";
    },
  },
};

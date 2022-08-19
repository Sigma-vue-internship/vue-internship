<template>
  <div>
    <div v-if="!isEditFormShow" class="item_container">
      <div class="item_details_container">
        <h3 @click="showHideDescription">
          <strong>Title:</strong>{{ item.label }}
        </h3>
        <TodoDetails
          v-if="isDescriptionShow"
          class="description"
          :itemDescription="item.description"
        />
      </div>
      <div>
        <button class="deleteBtn" @click="deleteTask">Delete</button>
        <button class="editBtn" @click="showHideEditForm">Edit</button>
      </div>
    </div>
    <TodoEditForm
      @showHideEditForm="showHideEditForm"
      :id="itemId"
      :title="item.label"
      :description="item.description"
      v-if="isEditFormShow"
    />
  </div>
</template>

<script>
import TodoDetails from "@/components/TodoDetails.vue";
import TodoEditForm from "@/components/TodoEditForm.vue";
export default {
  components: {
    TodoDetails,
    TodoEditForm,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    itemId: {
      type: Number,
    },
  },
  data() {
    return {
      isDescriptionShow: false,
      isEditFormShow: false,
    };
  },
  methods: {
    showHideDescription() {
      this.isDescriptionShow = !this.isDescriptionShow;
    },
    showHideEditForm() {
      this.isEditFormShow = !this.isEditFormShow;
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.itemId);
    },
  },
};
</script>

<style lang="scss" scoped>
.item_title_container {
  display: flex;
  width: 350px;

  word-wrap: break-word;
  text-align: left;
}
.item_details_container {
  max-width: 350px;

  word-wrap: break-word;
  text-align: left;
}
.item_container {
  display: flex;
  padding: 20px;
  border: 3px dashed #42b983;
  border-radius: 20px;
  justify-content: space-between;
  font-family: cursive;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
}
.deleteBtn {
  margin-left: 10px;
  background: #d75215;
  background: linear-gradient(#d73c15, #360707);
  border-radius: 11px;
  border: 0px;
  transform: scale(1);
  padding: 10px 25px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font: normal bold 15px "Open Sans", sans-serif;
  text-align: center;
  transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
  &:hover {
    transform: scale(1.2);
  }
}
.editBtn {
  margin-left: 10px;
  background: #3cd715;
  background: linear-gradient(#62c949, #082b08);
  border-radius: 11px;
  border: 0px;
  transform: scale(1);
  padding: 10px 25px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font: normal bold 15px "Open Sans", sans-serif;
  text-align: center;
  transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
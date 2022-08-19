<template>
  <div class="todo">
    <h1 :style="{ color: fontColor }">
      {{ msg }}
    </h1>
    <input type="text" placeholder="Enter text..." v-model.trim="currentValue" class="current" />
    <button @click="addItem" class="btn-add">ADD</button>
    <ul class="list" v-if="items.length">
      <li v-for="(item, index) in items" :key="item.id" class="item">
        <button @click="removeItem(index)" class="btn-remove" :class="{ cross: item.done }">
          {{ item.title }}
        </button>
        <input type="checkbox" v-model="item.done" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "ToDo",
    props: {
      msg: String
    },
    data () {
      return {
        items:[],
        currentValue:""
      }
    },
    methods: {
      addItem() {
        this.currentValue ? this.pushData() : false;
        this.currentValue="";
      },
      pushData() {
        this.items.push({
          title: this.currentValue,
          done: false
        })
      },
      removeItem(index) {
        this.items.splice(index, 1);
      }
    },
    computed: {
      fontColor() {
        const numberOfDone = this.items.filter(item => item.done).length;
        const numberOfItems = this.items.length;
        return numberOfDone===0 && numberOfItems>0 ? "red"
          :numberOfDone>=numberOfItems/2 && numberOfDone!==numberOfItems ? "yellow"
            :numberOfDone===numberOfItems && numberOfDone!==0 ? "green"
              :"rgb(17, 1, 34)"
      }
    }
  }
</script>

<style scoped lang="scss">
  @mixin btn-style {
    font-weight: 700;
    color: white;
    background-color: rgb(70, 42, 82);
    border: 1px solid rgb(17, 1, 34);
    border-radius: 2px;
  }
  .list {
    list-style-type: none;
    padding: 0;
  }
  .cross {
    text-decoration: line-through;
  }
  input[type=text] {
    width: 300px;
    height: 30px;
    border: 1px solid rgb(17, 1, 34);
    border-radius: 2px;
  }
  .btn-add {
    height: 34px;
    width: 45px;
    @include btn-style;
  }
  .btn-remove {
    width: 250px;
    height: 30px;
    @include btn-style;
  }
  input[type=checkbox] {
    height: 31px;
    width: 45px;
    margin: 0;
  }
  .item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    margin-bottom: 5px;
  }
</style>

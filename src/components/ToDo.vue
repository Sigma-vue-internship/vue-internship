<template>
  <div class="todo">
    <h1 :style="{ color: fontColor }">
      {{ msg }}
    </h1>
    <input type="text" placeholder="Enter text..." v-model.trim="currentValue" class="input-current" />
    <button @click="addItem" class="btn-add">ADD</button>
    <ul class="ul-list">
      <li v-for="(item, index) in items" :key="item.id" class="li-item">
        <button @click="removeItem(index, item)"
          :class="{
            'btn-remove': item,
            'li-cross': item.done===true}"
        >
          {{item.title}}
        </button>
        <input type="checkbox" @click="crossItem(item)" v-model="item.done" />
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
        currentValue:"",
        count:0
      }
    },
    methods: {
      addItem() {
        this.currentValue?this.items.push({
          title: this.currentValue,
          done: false
        }):false;
        this.currentValue="";
      },
      crossItem(item) {
        item.done = !item.done;
        item.done?this.count++:this.count--;
      },
      removeItem(index, item) {
        this.items.splice(index, 1);
        (this.count!==0&&item.done)?this.count--:false;
      }
    },
    computed: {
      fontColor() {
        const result = Math.floor(this.items.length/2);
        return this.count===0&&this.items.length>0?"red"
          :this.count>result&&this.count!==this.items.length?"yellow"
            :this.count===this.items.length&&this.count!==0?"green"
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
  .ul-list {
    list-style-type: none;
    padding: 0;
  }
  .li-cross {
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
  .li-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    margin-bottom: 5px;
  }
</style>

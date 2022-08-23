import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        item: {
            title: "",
            description: "",
            done: false,
            clicked: false,
            edit: false
        },
        itemHistory: []
    },
    getters: {
        getItem: state => state.item,
        getItemHistory: state => state.itemHistory
    }, 
    mutations: {
        SET_ITEM(state, newItem) {
            state.item = {
                title: newItem.title,
                description: newItem.description,
                done: false,
                clicked: false,
                edit: false
            }
        },
        SET_ITEMS(state) {
            state.itemHistory.push(state.item);
            state.item = { title: "", description: "" }
        },
        REMOVE_ITEM(state, index) {
            state.itemHistory.splice(index, 1);
        },
        CHANGE_CLICK(state, item) {
            state.item.clicked = !item.clicked;
        },
        EDIT_ITEM(state, item) {
            state.item = item[1];
            state.itemHistory.splice(item[0], 1, state.item);
        }
    },
    actions: {
        addItem({ commit }, item) {
            commit("SET_ITEM", item);
            commit("SET_ITEMS");
        },
        removeItem({ commit }, id) {
            commit("REMOVE_ITEM", id)
        },
        changeClick({ commit }, item) {
            commit("CHANGE_CLICK", item)
        },
        editItem({ commit }, item) {
            commit("EDIT_ITEM", item)
        }
    }
})
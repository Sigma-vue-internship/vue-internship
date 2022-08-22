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
        newItemEdit: {
            title: "",
            description: "",
            done: false,
            clicked: false,
            edit: true
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
                title: newItem[0],
                description: newItem[1],
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
        NEW_ITEM(state, item) {
            state.newItemEdit = item;
        },
        EDIT_ITEM(state, index) {
            state.itemHistory.splice(index, 1, state.newItemEdit);
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
        newItem({ commit }, item) {
            commit("NEW_ITEM", item)
        },
        editItem({ commit }, index) {
            commit("EDIT_ITEM", index)
        }
    }
})
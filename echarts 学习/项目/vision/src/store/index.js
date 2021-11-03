import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        theme:'chalk',
    },
    mutations: {
        changeTheme(state,value) {
            if (value) { //如果localStorage存在theme的话
               return state.theme = value;
            }
            state.theme === 'chalk' ? state.theme = 'vintage' : state.theme = 'chalk';
            localStorage.setItem('theme', state.theme);
        }
    },
    actions: {},
    modules:{},
})
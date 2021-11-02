import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        theme:'chalk',
    },
    mutations: {
        changeTheme(state) {
            state.theme === 'chalk' ? state.theme = 'vintage' : state.theme = 'chalk';
        }
    },
    actions: {},
    modules:{},
})
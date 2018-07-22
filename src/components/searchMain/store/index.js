export default {
    namespaced: true,
    state: {
        searchHistory: []
    },
    mutations: {
        saveSearchHistory (state, params) {
            state.searchHistory.push(params);
        }
    }
}
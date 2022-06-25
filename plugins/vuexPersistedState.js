import persistedState from 'vuex-persistedstate'

export default ({ store }) => {
  persistedState({
    key: '_abc',
    reducer: (state) => ({
      User: state.User ,
      FriendsProfiles: state.FriendsProfiles ,
      Chats: state.Chats,
    }),
    storage: {
      getItem(key) {
        return localStorage.getItem(key)
      },

      setItem(key, value) {
        localStorage.setItem(key, value)
      },

      removeItem(key) {
        localStorage.removeItem(key)
      },
    },
  })(store)
}

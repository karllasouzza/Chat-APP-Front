export const state = () => ({
  user: {},
  userImg: '',
  userChats: [],
  friendsProfiles: [],
})

export const mutations = {
  addUser(state, user) {
    state.user = user
  },

  clearUser(state, user) {
    state.user = ''
  },
}

export const actions = {
  SetUser(context, user) {
    context.commit('addUser', user)
  },
}

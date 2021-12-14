export const state = () => ({
  user: null,
  logado: false,
})

// mutations
export const mutations = {
  // Items
  addUser(state, User) {
    state.user = User
    state.logado = true
  },
  clearUser(state, User) {
    state.user = {}
    state.logado = false
  },
}

// actions
export const actions = {
  SetUser(context, Usuario) {
    context.commit('addUser', Usuario)
  },
}
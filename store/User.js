export const state = () => ({
  userID: null,
  logado: false,
})

export const mutations = {
  addUser(state, Usuario) {
    state.userID = Usuario
    state.logado = true
  },
  clearUser(state, User) {
    state.userID = ''
    state.logado = false
  },
}

export const actions = {
  SetUser(context, Usuario) {
    context.commit('addUser', Usuario.User)
  },
}

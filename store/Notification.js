export const state = () => ({
  text: '',
  view: false,
})

// mutations
export const mutations = {
  OpenNotfy(state, text) {
    state.text = text
    state.view = true
  },
  CloseNotfy(state) {
    state.text = ''
    state.view = false
  },
}

// actions
export const actions = {
  SetNotfy(context, text) {
    context.commit('OpenNotfy', text)
  },
}
